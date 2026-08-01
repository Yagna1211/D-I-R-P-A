import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";


dotenv.config();

// Load applet config and initialize Firebase Admin safely with project ID and custom database ID from local config if possible
let firebaseAppletConfig: any = {};
try {
  const rawConfig = fs.readFileSync(path.join(process.cwd(), 'firebase-applet-config.json'), 'utf8');
  firebaseAppletConfig = JSON.parse(rawConfig);
} catch (e: any) {
  console.warn("Could not load firebase-applet-config.json:", e.message);
}

try {
  if (firebaseAppletConfig.projectId) {
    admin.initializeApp({
      projectId: firebaseAppletConfig.projectId
    });
    console.log("Firebase Admin initialized successfully using project ID:", firebaseAppletConfig.projectId);
  } else {
    admin.initializeApp();
    console.log("Firebase Admin initialized via Application Default Credentials.");
  }
} catch (error: any) {
  try {
    admin.initializeApp();
    console.log("Firebase Admin initialized via Application Default Credentials (fallback).");
  } catch (err: any) {
    console.warn("Firebase Admin failed to initialize. Server integrations will fallback to standard mock behaviors. Error:", err.message);
  }
}

// Get global dbAdmin instance correctly with custom database ID
let dbAdmin: any;
try {
  const dbId = firebaseAppletConfig.firestoreDatabaseId;
  dbAdmin = dbId ? getFirestore(undefined, dbId) : getFirestore();
  if (dbId) {
    console.log("Firestore Admin initialized successfully with database ID:", dbId);
  } else {
    console.log("Firestore Admin initialized with default database (dbId is empty).");
  }
} catch (err: any) {
  dbAdmin = getFirestore();
  console.warn("Firestore Admin fallback initialized with default database. Error:", err.message);
}

// Port is hardcoded to 3000 as per environment constraints
function getEquivalentCourseIds(courseId: string): string[] {
  const cid = courseId.toLowerCase().trim();
  if (cid === "inter_001" || cid === "mpc") {
    return ["inter_001", "mpc", "Intermediate MPC (Maths, Physics, Chemistry)", "Intermediate MPC (Code: 001)"];
  }
  if (cid === "inter_002" || cid === "mec") {
    return ["inter_002", "mec", "Intermediate MEC (Mathematics, Economics, Commerce)", "Intermediate MEC (Code: 002)"];
  }
  if (cid === "inter_003" || cid === "bipc" || cid === "bpc") {
    return ["inter_003", "bipc", "bpc", "Intermediate BiPC (Biology, Physics, Chemistry)", "Intermediate BiPC (Code: 003)"];
  }
  if (cid === "inter_004" || cid === "cec") {
    return ["inter_004", "cec", "Intermediate CEC (Civics, Economics, Commerce)", "Intermediate CEC (Code: 004)"];
  }
  if (cid === "inter_005" || cid === "hec") {
    return ["inter_005", "hec", "Intermediate HEC (History, Economics, Civics)", "Intermediate HEC (Code: 005)"];
  }
  return [courseId];
}

const PORT = 3000;

async function startServer() {
  const app = express();
  
  // Parse incoming JSON requests
  app.use(express.json());

  // Initialize server-side Gemini client
  let ai: GoogleGenAI | null = null;
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } else {
      console.warn("GEMINI_API_KEY is not configured yet. AI features will fallback to client-simulated answers.");
    }
  } catch (error) {
    console.error("Failed to initialize Gemini API:", error);
  }

  // API router - health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "alive", code: 200, system: "DIRPA Engine" });
  });

  // In-memory backend database for saved/bookmarked courses
  let backendSavedPathIds: string[] = [];
  // In-memory backend database for alumni/graduate reviews
  let backendReviews: any[] = [];
  // Safe in-memory database fallback to handle Firestore Admin API failures gracefully
  let inMemoryFeedbacks: any[] = [];

  // API router - get saved pathways
  app.get("/api/bookmarks", (req, res) => {
    res.json({ savedPathIds: backendSavedPathIds });
  });

  // API router - save/bookmark course selection (toggle)
  app.post("/api/bookmarks", (req, res) => {
    const { pathId } = req.body;
    if (!pathId) {
      return res.status(400).json({ error: "Missing pathId in request body" });
    }
    if (backendSavedPathIds.includes(pathId)) {
      backendSavedPathIds = backendSavedPathIds.filter(id => id !== pathId);
    } else {
      backendSavedPathIds.push(pathId);
    }
    res.json({ savedPathIds: backendSavedPathIds });
  });

  // API router - get reviews
  app.get("/api/reviews", (req, res) => {
    res.json({ reviews: backendReviews });
  });

  // API router - add a review
  app.post("/api/reviews", (req, res) => {
    const review = req.body;
    if (!review || !review.pathwayId) {
      return res.status(400).json({ error: "Invalid review payload or missing pathwayId" });
    }
    backendReviews.push(review);
    res.json({ status: "success", reviews: backendReviews });
  });

  // API router - modify/update a review
  app.put("/api/reviews/:commentId", (req, res) => {
    const { commentId } = req.params;
    const body = req.body;
    backendReviews = backendReviews.map(r => {
      if (r.id === commentId) {
        return {
          ...r,
          experience: body.experience !== undefined ? body.experience : r.experience,
          advice: body.advice !== undefined ? body.advice : r.advice,
          rating: body.rating !== undefined ? body.rating : r.rating,
          likes: body.likes !== undefined ? body.likes : r.likes,
          replies: body.replies !== undefined ? body.replies : r.replies
        };
      }
      return r;
    });
    res.json({ status: "success", reviews: backendReviews });
  });

  // API router - delete a review
  app.delete("/api/reviews/:commentId", (req, res) => {
    const { commentId } = req.params;
    backendReviews = backendReviews.filter(r => r.id !== commentId);
    res.json({ status: "success", reviews: backendReviews });
  });

  // --- ALUMNI FEEDBACK ENDPOINTS ---

  // --- ALUMNI FEEDBACK ENDPOINTS ---

  // POST /feedback (creates feedback in Firestore, falls back to in-memory)
  app.post(["/feedback", "/api/feedback"], async (req, res) => {
    try {
      const data = req.body;

      if (!data.userId || !data.courseId || !data.educationalStage || !data.institutionName || !data.completionYear || !data.feedbackText || data.overallRating === undefined) {
        return res.status(400).json({ error: "Missing required feedback fields" });
      }

      const feedbackId = data.feedbackId || `feedback_${Date.now()}`;

      const feedbackDoc = {
        feedbackId,
        userId: data.userId,
        courseId: data.courseId,
        courseName: data.courseName || "General Course / Pathway",
        educationalStage: data.educationalStage,
        institutionName: data.institutionName,
        completionYear: String(data.completionYear),
        feedbackText: data.feedbackText,
        difficultyRating: parseInt(data.difficultyRating) || 3,
        overallRating: parseInt(data.overallRating) || 5,
        skillsLearned: data.skillsLearned || "",
        likedMost: data.likedMost || "",
        challengesFaced: data.challengesFaced || "",
        careerOutcome: data.careerOutcome || "",
        advice: data.advice || "",
        currentJobRole: data.currentJobRole || "",
        companyName: data.companyName || "",
        yearsOfExperience: String(data.yearsOfExperience || ""),
        name: data.name || "Verified Alumni",
        avatar: data.avatar || "🎓",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      try {
        if (dbAdmin) {
          const docRef = dbAdmin.collection("feedbacks").doc(feedbackId);
          await docRef.set(feedbackDoc);
        }
      } catch (dbErr: any) {
        console.warn("[DIRPA DB Proxy] Create feedback Firestore call failed. Saving to in-memory fallback. Exception:", dbErr.message);
      }

      // Sync to in-memory list
      inMemoryFeedbacks = inMemoryFeedbacks.filter(f => f.feedbackId !== feedbackId);
      inMemoryFeedbacks.push(feedbackDoc);

      res.status(201).json(feedbackDoc);
    } catch (error: any) {
      console.error("Create feedback error:", error);
      res.status(550).json({ error: error.message }); // Use non-500 or handle normally
    }
  });

  // GET /feedback/course/:courseId (falls back to in-memory)
  app.get(["/feedback/course/:courseId", "/api/feedback/course/:courseId"], async (req, res) => {
    try {
      const { courseId } = req.params;
      const eqIds = getEquivalentCourseIds(String(courseId));
      let list: any[] = [];
      try {
        if (dbAdmin) {
          const snapshot = await dbAdmin.collection("feedbacks").where("courseId", "in", eqIds).get();
          snapshot.forEach((doc: any) => {
            list.push(doc.data());
          });
        } else {
          throw new Error("dbAdmin not initialized");
        }
      } catch (dbErr: any) {
        console.warn("[DIRPA DB Proxy] Get feedback by course Firestore call failed. Querying from in-memory fallback. Exception:", dbErr.message);
        list = inMemoryFeedbacks.filter(f => eqIds.includes(f.courseId));
      }
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      res.json(list);
    } catch (error: any) {
      console.error("Get feedback by course error:", error);
      res.status(200).json([]); // Always return safe arrays
    }
  });

  // GET /feedback/user/:userId (falls back to in-memory)
  app.get(["/feedback/user/:userId", "/api/feedback/user/:userId"], async (req, res) => {
    try {
      const { userId } = req.params;
      let list: any[] = [];
      try {
        if (dbAdmin) {
          const snapshot = await dbAdmin.collection("feedbacks").where("userId", "==", userId).get();
          snapshot.forEach((doc: any) => {
            list.push(doc.data());
          });
        } else {
          throw new Error("dbAdmin not initialized");
        }
      } catch (dbErr: any) {
        console.warn("[DIRPA DB Proxy] Get feedback by user Firestore call failed. Querying from in-memory fallback. Exception:", dbErr.message);
        list = inMemoryFeedbacks.filter(f => f.userId === userId);
      }
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      res.json(list);
    } catch (error: any) {
      console.error("Get feedback by user error:", error);
      res.status(200).json([]);
    }
  });

  // PUT /feedback/:feedbackId (falls back to in-memory)
  app.put(["/feedback/:feedbackId", "/api/feedback/:feedbackId"], async (req, res) => {
    try {
      const { feedbackId } = req.params;
      let existingData: any = null;

      // Try reading from Firestore
      try {
        if (dbAdmin) {
          const docRef = dbAdmin.collection("feedbacks").doc(feedbackId);
          const docSnap = await docRef.get();
          if (docSnap.exists) {
            existingData = docSnap.data();
          }
        }
      } catch (dbErr: any) {
        console.warn("[DIRPA DB Proxy] Fetch existing feedback Firestore call failed. Transitioning to in-memory search.");
      }

      if (!existingData) {
        existingData = inMemoryFeedbacks.find(f => f.feedbackId === feedbackId);
      }

      if (!existingData) {
        return res.status(404).json({ error: "Feedback item not found" });
      }

      const updatedData = {
        ...existingData,
        ...req.body,
        feedbackId, // Preserve ID
        updatedAt: new Date().toISOString()
      };

      if (updatedData.overallRating !== undefined) updatedData.overallRating = parseInt(updatedData.overallRating) || 5;
      if (updatedData.difficultyRating !== undefined) updatedData.difficultyRating = parseInt(updatedData.difficultyRating) || 3;

      // Try writing to Firestore
      try {
        if (dbAdmin) {
          const docRef = dbAdmin.collection("feedbacks").doc(feedbackId);
          await docRef.set(updatedData);
        }
      } catch (dbErr: any) {
        console.warn("[DIRPA DB Proxy] Write updated feedback Firestore call failed. Relying on in-memory mutation:", dbErr.message);
      }

      // Sync to in-memory list
      inMemoryFeedbacks = inMemoryFeedbacks.filter(f => f.feedbackId !== feedbackId);
      inMemoryFeedbacks.push(updatedData);

      res.json(updatedData);
    } catch (error: any) {
      console.error("Update feedback error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE /feedback/:feedbackId (falls back to in-memory)
  app.delete(["/feedback/:feedbackId", "/api/feedback/:feedbackId"], async (req, res) => {
    try {
      const { feedbackId } = req.params;
      
      try {
        if (dbAdmin) {
          await dbAdmin.collection("feedbacks").doc(feedbackId).delete();
        }
      } catch (dbErr: any) {
        console.warn("[DIRPA DB Proxy] Delete feedback Firestore call failed. Performing in-memory removal. Exception:", dbErr.message);
      }

      inMemoryFeedbacks = inMemoryFeedbacks.filter(f => f.feedbackId !== feedbackId);
      res.json({ status: "success", feedbackId });
    } catch (error: any) {
      console.error("Delete feedback error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // GET /feedback/filter (falls back to in-memory)
  app.get(["/feedback/filter", "/api/feedback/filter"], async (req, res) => {
    try {
      const { sort, completionYear, institutionName, educationalStage, search, courseId } = req.query;

      let list: any[] = [];
      try {
        if (dbAdmin) {
          let ref: any = dbAdmin.collection("feedbacks");
          if (courseId) {
            const eqIds = getEquivalentCourseIds(String(courseId));
            ref = ref.where("courseId", "in", eqIds);
          }
          const snapshot = await ref.get();
          snapshot.forEach((doc: any) => {
            list.push(doc.data());
          });
        } else {
          throw new Error("dbAdmin not initialized");
        }
      } catch (dbErr: any) {
        console.warn("[DIRPA DB Proxy] Filter feedback Firestore call failed. Querying from in-memory fallback. Exception:", dbErr.message);
        if (courseId) {
          const eqIds = getEquivalentCourseIds(String(courseId));
          list = inMemoryFeedbacks.filter(f => eqIds.includes(f.courseId));
        } else {
          list = [...inMemoryFeedbacks];
        }
      }

      if (completionYear) {
        list = list.filter(item => String(item.completionYear) === String(completionYear));
      }
      if (institutionName) {
        const pQuery = String(institutionName).toLowerCase();
        list = list.filter(item => item.institutionName && item.institutionName.toLowerCase().includes(pQuery));
      }
      if (educationalStage && educationalStage !== "All") {
        list = list.filter(item => String(item.educationalStage).toLowerCase() === String(educationalStage).toLowerCase());
      }
      if (search) {
        const searchStr = String(search).toLowerCase();
        list = list.filter(item => {
          return (item.courseName && item.courseName.toLowerCase().includes(searchStr)) ||
                 (item.feedbackText && item.feedbackText.toLowerCase().includes(searchStr)) ||
                 (item.currentJobRole && item.currentJobRole.toLowerCase().includes(searchStr)) ||
                 (item.skillsLearned && item.skillsLearned.toLowerCase().includes(searchStr)) ||
                 (item.likedMost && item.likedMost.toLowerCase().includes(searchStr)) ||
                 (item.challengesFaced && item.challengesFaced.toLowerCase().includes(searchStr)) ||
                 (item.careerOutcome && item.careerOutcome.toLowerCase().includes(searchStr)) ||
                 (item.advice && item.advice.toLowerCase().includes(searchStr)) ||
                 (item.companyName && item.companyName.toLowerCase().includes(searchStr));
        });
      }

      // Sort
      if (sort === "highest_rated") {
        list.sort((a, b) => (b.overallRating || 0) - (a.overallRating || 0));
      } else if (sort === "lowest_rated") {
        list.sort((a, b) => (a.overallRating || 0) - (b.overallRating || 0));
      } else {
        // most_recent default
        list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      }

      res.json(list);
    } catch (error: any) {
      console.error("Filter feedback error:", error);
      res.json([]);
    }
  });

  // In-memory backend database for user profiles
  let backendProfiles: any[] = [];
  // In-memory messages / conversations databases
  let backendConversations: any[] = [];
  let backendMessages: Record<string, any[]> = {};

  // API router - PUT update profile (matches /profile/update and /api/profile/update)
  const handleProfileUpdate = (req: any, res: any) => {
    const { userId, name, email, bio, avatar, interests, strengths, careerGoal } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId in profile update" });
    }
    const idx = backendProfiles.findIndex(p => p.id === userId);
    const updatedProfile = {
      id: userId,
      name,
      email,
      bio,
      avatar,
      interests: interests || [],
      strengths: strengths || [],
      careerGoal: careerGoal || '',
      updatedAt: new Date().toISOString()
    };
    if (idx !== -1) {
      backendProfiles[idx] = updatedProfile;
    } else {
      backendProfiles.push(updatedProfile);
    }
    res.json({ status: "success", profile: updatedProfile });
  };
  app.put("/api/profile/update", handleProfileUpdate);
  app.put("/profile/update", handleProfileUpdate);

  // API router - DELETE specific message from subcollection
  const handleDeleteMessageRoute = (req: any, res: any) => {
    const { threadId, messageId } = req.params;
    if (backendMessages[threadId]) {
      backendMessages[threadId] = backendMessages[threadId].filter(m => m.id !== messageId);
    }
    res.json({ status: "success", message: "Message deleted successfully" });
  };
  app.delete("/api/messages/:threadId/:messageId", handleDeleteMessageRoute);
  app.delete("/messages/:threadId/:messageId", handleDeleteMessageRoute);

  // API router - DELETE conversation thread
  const handleDeleteConversationRoute = (req: any, res: any) => {
    const { threadId } = req.params;
    backendConversations = backendConversations.filter(c => c.id !== threadId);
    delete backendMessages[threadId];
    res.json({ status: "success", message: "Conversation deleted successfully" });
  };
  app.delete("/api/conversations/:threadId", handleDeleteConversationRoute);
  app.delete("/conversations/:threadId", handleDeleteConversationRoute);


  // AI Recommendation endpoint using GoogleGenAI SDK
  app.post("/api/recommend", async (req, res) => {
    try {
      const { level, interests, strengths, budget, durationPref, careerGoal } = req.body;

      if (!level || !interests || !strengths || !careerGoal) {
        return res.status(400).json({ error: "Missing required fields in recommendation request" });
      }

      // If Gemini client isn't configured, return a comprehensive structured mock fallback
      if (!ai) {
        return res.json(getMockRecommendation(level, interests, strengths, budget, durationPref, careerGoal));
      }

      const prompt = `You are the DIRPA AI academic and career advisor. Recommend customized educational pathways based on the student's background:
      Academic Level Completed: Finished ${level}
      Interests: ${interests.join(", ")}
      Strengths: ${strengths.join(", ")}
      Budget Constraints level: ${budget}
      Maximum/desired duration: ${durationPref}
      Career goal or position: ${careerGoal}

      Recommend 2 highly suitable educational routes and 2 alternative pathways.
      For EVERY course pathway, provide genuine, highly realistic data including:
      1. Course Name & Overview.
      2. Comprehensive Syllabus (semester/year modules with specific topics and learning outcomes).
      3. Authentic Alumni & Mentor Feedback (author name, role/graduation year, 1-5 rating, review text, advice).
      4. Potential Job Roles with FULL, realistic descriptions (Job title, short description, full overview, responsibilities, required skills, salary range for entry/mid/senior levels, growth scope, top recruiters, certifications).

      Ensure suggestions reside in JSON output matching the requested schema. Make data realistic for Indian and international academic/industry standards.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an expert educational counselor with deep knowledge of academic pathways, diplomas, syllabus structures, alumni experiences, and real-world career job descriptions.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedPaths: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Official name of the academic degree or pathway" },
                    description: { type: Type.STRING, description: "Brief overview of this degree or pathway" },
                    whyFits: { type: Type.STRING, description: "Detailed explanation of why it suits the student" },
                    estimatedFees: { type: Type.STRING, description: "Estimated average fees" },
                    duration: { type: Type.STRING, description: "Estimated completion duration" },
                    syllabus: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          semesterOrYear: { type: Type.STRING },
                          title: { type: Type.STRING },
                          topics: { type: Type.ARRAY, items: { type: Type.STRING } },
                          learningOutcome: { type: Type.STRING }
                        },
                        required: ["semesterOrYear", "title", "topics"]
                      }
                    },
                    feedback: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          authorName: { type: Type.STRING },
                          roleOrYear: { type: Type.STRING },
                          rating: { type: Type.NUMBER },
                          feedbackText: { type: Type.STRING },
                          keyTakeaway: { type: Type.STRING }
                        },
                        required: ["authorName", "roleOrYear", "rating", "feedbackText"]
                      }
                    },
                    jobs: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          title: { type: Type.STRING },
                          shortDescription: { type: Type.STRING },
                          fullOverview: { type: Type.STRING },
                          responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
                          requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                          salaryRange: {
                            type: Type.OBJECT,
                            properties: {
                              entry: { type: Type.STRING },
                              mid: { type: Type.STRING },
                              senior: { type: Type.STRING }
                            },
                            required: ["entry", "mid", "senior"]
                          },
                          growthScope: { type: Type.STRING },
                          topRecruiters: { type: Type.ARRAY, items: { type: Type.STRING } },
                          recommendedCertifications: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["title", "shortDescription", "fullOverview", "responsibilities", "requiredSkills", "salaryRange", "growthScope", "topRecruiters"]
                      }
                    }
                  },
                  required: ["name", "description", "whyFits", "estimatedFees", "syllabus", "feedback", "jobs"]
                }
              },
              alternatives: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    whyAlternative: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    estimatedFees: { type: Type.STRING },
                    syllabus: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          semesterOrYear: { type: Type.STRING },
                          title: { type: Type.STRING },
                          topics: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["semesterOrYear", "title", "topics"]
                      }
                    },
                    feedback: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          authorName: { type: Type.STRING },
                          roleOrYear: { type: Type.STRING },
                          rating: { type: Type.NUMBER },
                          feedbackText: { type: Type.STRING }
                        },
                        required: ["authorName", "roleOrYear", "rating", "feedbackText"]
                      }
                    },
                    jobs: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          title: { type: Type.STRING },
                          shortDescription: { type: Type.STRING },
                          fullOverview: { type: Type.STRING },
                          responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
                          requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                          salaryRange: {
                            type: Type.OBJECT,
                            properties: {
                              entry: { type: Type.STRING },
                              mid: { type: Type.STRING },
                              senior: { type: Type.STRING }
                            },
                            required: ["entry", "mid", "senior"]
                          },
                          growthScope: { type: Type.STRING },
                          topRecruiters: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["title", "shortDescription", "fullOverview", "responsibilities", "requiredSkills", "salaryRange", "growthScope", "topRecruiters"]
                      }
                    }
                  },
                  required: ["name", "description", "whyAlternative", "syllabus", "feedback", "jobs"]
                }
              },
              generalAdvice: { type: Type.STRING }
            },
            required: ["recommendedPaths", "alternatives", "generalAdvice"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from Gemini API");
      }

      const recommendationData = JSON.parse(responseText.trim());
      res.json(recommendationData);
    } catch (error: any) {
      console.error("Gemini recommendation error:", error);
      res.status(500).json({
        error: "Failed to generate recommendation via AI. Returning smart counsel system fallback.",
        details: error?.message || ""
      });
    }
  });

  // Dedicated dynamic internet course explorer endpoint utilizing Google Search Grounding with Gemini AI
  app.post("/api/search-courses-web", async (req, res) => {
    try {
      const { userQuery } = req.body;
      const searchQuery = userQuery || "What are all the courses available after the 12th class and why do schools only emphasize a few?";

      if (!ai) {
        // High quality mock search response covering extensive real courses after 12th
        return res.json({
          answer: `### Why is there a misconception about post-12th options?
Historically, traditional educational systems, parents, and schools emphasize a limited set of pathways—principally **Engineering (B.Tech)** and **Medicine (MBBS)** because they represent mature industrial recruitment models. However, the modern Indian and Global university space has exploded with highly rewarding, varied, and critical courses across multiple structural fields.

### Comprehensive Directory of Major Courses available after Class 12

#### 1. Pure & Applied Sciences
*   **B.Sc (Hons) in Mathematics, Physics, Chemistry, Statistics** (Excellent for global research, cryptography, and actuarial analysis)
*   **B.Sc in Biotechnology / Bioinformatics / Genetics** (Pivotal for vaccine, pharma, and ecological research)
*   **Bachelor of Science (Research)** (4-year curriculum offered at prestigious systems like IISc and IITs)

#### 2. Specialized Technical & Computational Fields
*   **BCA (Bachelor of Computer Applications)** (Focuses heavily on database configurations, web scripting, and software deployment)
*   **B.Sc Data Science & Artificial Intelligence** (Advanced statistical coding, machine learning modeling)
*   **B.Tech lateral programs** (For polytechnic diploma graduates directly entering the 2nd year of B.Tech)

#### 3. Healthcare & Medical Paramedical Streams
*   **B.Pharm (Bachelor of Pharmacy)** (Pharmaceutical pricing, formulation, clinical chemist certifications)
*   **B.Sc Nursing / B.Sc Anesthesia Technology** (Critical nursing, ICU operations, ambulance assistances)
*   **BPT (Bachelor of Physiotherapy)** (Post-operative rehabilitation, sports injury dynamics)
*   **BAMS / BHMS (Ayurveda and Homeopathy)** (Traditional medicine certifications)

#### 4. Commerce & Finance Architecture
*   **B.Com (Hons)** (Advanced financial systems, corporate audits, accounting models)
*   **CA (Chartered Accountancy)** (Completed via the ICAI Foundation exam after 12th - highly rewarding)
*   **CS (Company Secretary)** (Corporate law, drafting, regulatory compliance)
*   **CMA (Cost & Management Accountancy)** (Cost audits, budgeting layouts)

#### 5. Management & Business Sciences
*   **BBA (Bachelor of Business Administration)** (HR, operations, brand logistics)
*   **BMS (Bachelor of Management Studies)** (Core corporate leadership protocols)
*   **BHM (Bachelor of Hotel Management)** (Global hospitality pipelines, culinary kitchen metrics)

#### 6. Humanities, Arts & Creative Streams
*   **B.Des (Bachelor of Design)** (4-year premier creative degree in UI/UX, Interaction, Industrial, Fashion, or Graphic Design)
*   **BFA (Bachelor of Fine Arts)** (Aesthetic visual arts, sculpting, digital oil painting pedagogy)
*   **Integrated BA LLB / BBA LLB** (5-year direct path for law, judicial, and corporate legal counseling)
*   **B.Journ (Bachelor of Journalism & Mass Communication)** (Digital print journalism, video media channels, public relations)
*   **B.A. (Hons) in Psychology / Economics / Culinary Arts** (Advanced editorial research and specialty professions)

#### 7. Armed Forces and Specialized Operations
*   **NDA (National Defence Academy)** (Officer cadet paths in Army, Navy, Air Force)
*   **B.Sc Nautical Science (Merchant Navy)** (Naval operations, marine shipping coordinates, deck crew officer tracks)`,
          citations: [
            { title: "National Education Portal - India", url: "https://www.education.gov.in" },
            { title: "Ministry of Skill Development & Entrepreneurship", url: "https://www.msde.gov.in" }
          ]
        });
      }

      const prompt = `You are the DIRPA Professional Academic Advisor. Deeply address the student's query or general question using live web references with Google Search:
      Query: "${searchQuery}"
      
      Provide:
      1. A thorough explanation of why schools/parents typically promote only a tiny handful of options (the traditional tunnel vision of Engineering and Medicine) after 12th class, and debunk it.
      2. An exhaustive list of ALL major academic options, professional degrees, creative streams, vocational diplomas, and high-growth emerging pathways available after class 12 (including core entrance exams like JEE, NEET, CLAT, NID, NATA, NDA, etc.).
      3. Practical, human-centric advice on how to investigate these streams.
      
      Keep the formatting incredibly clean and highly legible using professional Markdown headings, lists, and bold accent lines.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a career counseling assistant. Always search the internet to present real, modern, accurate, and comprehensive courses and exams.",
          tools: [{ googleSearch: {} }]
        }
      });

      const responseText = response.text;
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const citations = chunks
        .map((c: any) => ({
          title: c.web?.title || "Search Reference",
          url: c.web?.uri || ""
        }))
        .filter((c: any) => c.url);

      res.json({
        answer: responseText,
        citations: citations
      });
    } catch (error: any) {
      console.error("Gemini course search error:", error);
      res.status(500).json({
        error: "Failed to perform AI web search. Returning smart fallback information.",
        details: error?.message || ""
      });
    }
  });

  // Handle Vite Asset Serving and SPA router
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DIRPA Server is booting up and listening on http://localhost:${PORT}`);
  });
}

// Simulated fallback recommendation engine for offline/unconfigured environments
function getMockRecommendation(
  level: string,
  interests: string[],
  strengths: string[],
  budget: string,
  durationPref: string,
  careerGoal: string
) {
  const formatInterests = interests.join(" and ");
  const formatStrengths = strengths.join(", ");
  
  return {
    recommendedPaths: [
      {
        name: level === "10th" ? "Intermediate MPC (Maths, Physics, Chemistry)" : "B.Tech Computer Science & Engineering",
        description: `A comprehensive engineering degree focused on software architecture, algorithms, cloud computing, and AI systems, perfectly targeted towards a career as a ${careerGoal || 'Software Engineer'}.`,
        whyFits: `Matches your strong interest in ${formatInterests} and leverages your core analytical strength in ${formatStrengths}. It directly prepares you for top-tier technology roles.`,
        estimatedFees: budget === "low" ? "₹20,000 - ₹50,000/yr (Government Subsidized)" : "₹1,50,000 - ₹3,00,000/yr (Private Accredited)",
        duration: "4 Years (8 Semesters)",
        syllabus: [
          {
            semesterOrYear: "Semester 1 & 2 (Year 1)",
            title: "Core Engineering Foundations & Computational Logic",
            topics: ["Calculus & Linear Algebra", "Engineering Physics", "Fundamentals of Programming in C/Python", "Digital Logic Design"],
            learningOutcome: "Master baseline mathematical principles and fundamental algorithmic reasoning."
          },
          {
            semesterOrYear: "Semester 3 & 4 (Year 2)",
            title: "Data Structures & Systems Architecture",
            topics: ["Object-Oriented Programming (Java/C++)", "Data Structures & Algorithms", "Database Management Systems (SQL/NoSQL)", "Operating Systems Architecture"],
            learningOutcome: "Ability to design memory-efficient data structures and query complex databases."
          },
          {
            semesterOrYear: "Semester 5 & 6 (Year 3)",
            title: "Software Engineering & Network Security",
            topics: ["Computer Networks & Security Protocols", "Web Applications & Microservices", "Machine Learning & AI Principles", "Agile Software Development"],
            learningOutcome: "Build scalable web services, API integrations, and predictive models."
          },
          {
            semesterOrYear: "Semester 7 & 8 (Year 4)",
            title: "Cloud Infrastructure, Distributed Systems & Capstone Project",
            topics: ["Cloud Computing (AWS/GCP)", "Distributed Systems & Kubernetes", "Cybersecurity Auditing", "Industry Internship & Capstone Project"],
            learningOutcome: "Deploy production-ready distributed applications and pass corporate placement interviews."
          }
        ],
        feedback: [
          {
            authorName: "Ananya Sharma",
            roleOrYear: "Class of 2024, Software Engineer at Microsoft",
            rating: 5,
            feedbackText: "The rigorous focus on Data Structures and System Design gave me an undeniable edge during off-campus placements. Highly recommend participating in open-source hackathons early on!",
            keyTakeaway: "Prioritize hands-on coding projects alongside classroom theory."
          },
          {
            authorName: "Rahul Varma",
            roleOrYear: "Senior Systems Architect, Tech Mahindra",
            rating: 4.5,
            feedbackText: "Great balance of theoretical Computer Science fundamentals and practical lab work. The cloud computing electives in 3rd year are crucial for modern job markets.",
            keyTakeaway: "Get certified in AWS or GCP before graduation."
          }
        ],
        jobs: [
          {
            title: careerGoal || "Software Engineer / Full Stack Developer",
            shortDescription: "Architect, develop, and maintain high-scale frontend and backend software applications.",
            fullOverview: "As a Software Engineer, you will be responsible for designing resilient software solutions, writing clean maintainable code, performing code reviews, and collaborating with product managers and UX designers to build user-centric digital products.",
            responsibilities: [
              "Design and build responsive web and mobile user interfaces using modern frameworks.",
              "Develop scalable RESTful APIs, GraphQL endpoints, and microservices.",
              "Optimize database queries and ensure database security and data integrity.",
              "Participate in daily agile standups, sprint planning, and automated CI/CD deployments."
            ],
            requiredSkills: ["Data Structures & Algorithms", "React / TypeScript", "Node.js / Express", "SQL & MongoDB", "Docker & Git"],
            salaryRange: {
              entry: "₹6,00,000 - ₹12,00,000 PA ($75,000 USD)",
              mid: "₹14,00,000 - ₹26,00,000 PA ($125,000 USD)",
              senior: "₹30,00,000 - ₹60,00,000+ PA ($180,000+ USD)"
            },
            growthScope: "Exponential growth with clear progression paths: Junior Dev → Senior Engineer → Tech Lead → Engineering Manager / CTO.",
            topRecruiters: ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Adobe", "Flipkart"],
            recommendedCertifications: ["AWS Certified Developer - Associate", "Meta Front-End Developer Professional Certificate"]
          },
          {
            title: "Cloud Infrastructure Architect",
            shortDescription: "Design, deploy, and manage secure cloud computing environments on GCP, AWS, or Azure.",
            fullOverview: "Cloud Infrastructure Architects lead the cloud transformation for enterprise organizations, ensuring high availability, disaster recovery, zero-downtime deployments, and optimal cost efficiency across cloud workloads.",
            responsibilities: [
              "Define cloud computing infrastructure blueprints using Infrastructure as Code (Terraform).",
              "Manage container orchestration platforms using Kubernetes and Docker.",
              "Implement robust security policies, IAM roles, and automated backup strategies.",
              "Monitor system metrics, latency, and operational health using Prometheus and Grafana."
            ],
            requiredSkills: ["AWS / GCP / Azure", "Kubernetes & Docker", "Terraform & Ansible", "Linux Systems Administration", "Networking Protocols"],
            salaryRange: {
              entry: "₹7,50,000 - ₹14,00,000 PA",
              mid: "₹18,00,000 - ₹32,00,000 PA",
              senior: "₹35,00,000 - ₹75,00,000+ PA"
            },
            growthScope: "High demand across global enterprise companies; fast-track transition to Director of Infrastructure.",
            topRecruiters: ["Google Cloud", "AWS", "Microsoft", "Accenture", "Deloitte Tech", "IBM"],
            recommendedCertifications: ["Google Cloud Certified Professional Cloud Architect", "AWS Certified Solutions Architect"]
          }
        ],
        timeline: [
          "Year 1: Master programming logic and core math",
          "Year 2: Master data structures and algorithms",
          "Year 3: Industrial internships & project development",
          "Year 4: Final year placements & capstone project"
        ],
        careerPotential: [careerGoal || "Software Engineer", "Cloud Infrastructure Architect", "AI Data Engineer"]
      },
      {
        name: level === "10th" ? "Polytechnic Diploma in Computer Engineering" : "B.Des in UI/UX & Product Design",
        description: "An intensive, practical degree focusing on user psychology, digital product design, interactive prototyping, and modern design systems.",
        whyFits: `Blends your creative interest in ${formatInterests} with your structural thinking (${formatStrengths}). Perfect for design-driven innovation.`,
        estimatedFees: budget === "high" ? "₹2,50,000/yr" : "₹45,000/yr",
        duration: "4 Years (8 Semesters)",
        syllabus: [
          {
            semesterOrYear: "Year 1",
            title: "Design Fundamentals, Color Theory & Visual Ergonomics",
            topics: ["History of Visual Communication", "Color Theory & Typography", "Drawing & Form Studies", "User Research Methodologies"],
            learningOutcome: "Gain deep visual literacy and empathetic user observation skills."
          },
          {
            semesterOrYear: "Year 2",
            title: "Interaction Design & Wireframing",
            topics: ["Information Architecture", "Wireframing & Prototyping in Figma", "Usability Testing Protocols", "Micro-interactions & Animation"],
            learningOutcome: "Build interactive clickable high-fidelity prototypes for web and mobile."
          },
          {
            semesterOrYear: "Year 3",
            title: "Design Systems & Frontend Design Engineering",
            topics: ["Design Systems (Tokens, Accessibility)", "HTML5/CSS3/Tailwind Engineering", "Mobile App UX Patterns", "Design Thinking Workshop"],
            learningOutcome: "Bridge the gap between design concepts and developer implementation."
          },
          {
            semesterOrYear: "Year 4",
            title: "Product Strategy & Graduation Portfolio",
            topics: ["UX Metrics & Analytics (A/B Testing)", "Design Leadership & Business Strategy", "Industry Graduation Internship", "Portfolio Defense"],
            learningOutcome: "Graduate with a job-ready portfolio containing multi-platform design case studies."
          }
        ],
        feedback: [
          {
            authorName: "Kavya Reddy",
            roleOrYear: "Lead UX Designer at Swiggy",
            rating: 5,
            feedbackText: "The hands-on user research exercises and Figma design system workshops were fantastic. It taught me how to advocate for the user in real product teams.",
            keyTakeaway: "Document your design reasoning thoroughly in case studies."
          }
        ],
        jobs: [
          {
            title: "Product UX/UI Designer",
            shortDescription: "Conduct user research and design beautiful, functional digital product interfaces.",
            fullOverview: "Product Designers shape how millions of users experience software products. You will work closely with engineering teams to transform complex user problems into effortless digital interactions.",
            responsibilities: [
              "Conduct qualitative user interviews and quantitative usability studies.",
              "Create wireframes, user flow diagrams, and high-fidelity interactive prototypes in Figma.",
              "Establish and maintain design systems across iOS, Android, and Web platforms.",
              "Iterate based on user feedback, analytics data, and business KPIs."
            ],
            requiredSkills: ["Figma & Adobe CC", "User Research & Usability Testing", "Design Systems & Tokens", "Interaction Design", "Prototyping"],
            salaryRange: {
              entry: "₹5,50,000 - ₹10,00,000 PA",
              mid: "₹12,00,000 - ₹22,00,000 PA",
              senior: "₹25,00,000 - ₹45,00,000+ PA"
            },
            growthScope: "Tremendous growth in tech, SaaS, and e-commerce companies; career path leads to Head of Design / VP of Product.",
            topRecruiters: ["Swiggy", "Zomato", "Uber", "Razorpay", "Adobe", "CRED"],
            recommendedCertifications: ["Google UX Design Professional Certificate", "Figma Design System Specialist"]
          }
        ],
        timeline: [
          "Year 1: Design theory & sketch fundamentals",
          "Year 2: Figma prototyping & usability studies",
          "Year 3: Design systems & live app case studies",
          "Year 4: Corporate design internship & portfolio launch"
        ],
        careerPotential: ["Product UX/UI Designer", "Design Systems Specialist", "UX Researcher"]
      }
    ],
    alternatives: [
      {
        name: "BCA (Bachelor of Computer Applications)",
        description: "A specialized 3-year undergraduate course focusing on practical software development, database administration, and web applications.",
        whyAlternative: "Offers a faster 3-year entry into IT careers with a lower tuition burden.",
        duration: "3 Years",
        estimatedFees: "₹40,000 - ₹90,000/yr",
        syllabus: [
          {
            semesterOrYear: "Year 1",
            title: "Programming & Database Foundations",
            topics: ["Programming in C & C++", "Computer Fundamentals", "Relational Databases (SQL)", "Web Technologies"]
          },
          {
            semesterOrYear: "Year 2 & 3",
            title: "Full Stack & Mobile Development",
            topics: ["Java & Python Development", "Software Engineering Principles", "Cloud Deployment", "Final Year Project"]
          }
        ],
        feedback: [
          {
            authorName: "Siddharth Verma",
            roleOrYear: "BCA Graduate, Web Developer at TechCorp",
            rating: 4,
            feedbackText: "Great choice if you want to complete your degree in 3 years and start working or pursue an MCA later."
          }
        ],
        jobs: [
          {
            title: "Junior Web Developer",
            shortDescription: "Build and maintain responsive websites and web applications.",
            fullOverview: "Develop modern web applications using HTML, CSS, JavaScript, and backend APIs.",
            responsibilities: [
              "Implement web pages matching UI designs.",
              "Connect frontend components to backend databases.",
              "Fix bugs and optimize website performance."
            ],
            requiredSkills: ["JavaScript", "HTML/CSS", "SQL", "Git"],
            salaryRange: {
              entry: "₹3,50,000 - ₹6,50,000 PA",
              mid: "₹7,00,000 - ₹12,00,000 PA",
              senior: "₹15,00,000 - ₹28,00,000 PA"
            },
            growthScope: "Fast-track promotion to Full Stack Developer upon mastering backend frameworks.",
            topRecruiters: ["TCS", "Wipro", "Cognizant", "HCL Tech"]
          }
        ]
      },
      {
        name: "B.Sc in Data Science & Artificial Intelligence",
        description: "An intensive 3 to 4-year degree focusing on statistical modeling, big data analytics, machine learning, and AI algorithms.",
        whyAlternative: "Direct specialization into high-growth AI and Data Analytics domains without traditional general engineering electives.",
        duration: "3 - 4 Years",
        estimatedFees: "₹60,000 - ₹1,50,000/yr",
        syllabus: [
          {
            semesterOrYear: "Year 1 & 2",
            title: "Statistics, Probability & Python for Data Science",
            topics: ["Applied Statistics & Probability", "Python Data Science Stack (NumPy, Pandas)", "Database Analytics", "Data Visualization"]
          },
          {
            semesterOrYear: "Year 3 & 4",
            title: "Machine Learning, Deep Learning & Big Data",
            topics: ["Supervised & Unsupervised Machine Learning", "Neural Networks & PyTorch", "Big Data Processing (Spark)", "NLP & Computer Vision"]
          }
        ],
        feedback: [
          {
            authorName: "Divya Nair",
            roleOrYear: "Data Analyst at Tiger Analytics",
            rating: 5,
            feedbackText: "The mathematical rigor and heavy Python orientation prepared me perfectly for real analytics projects."
          }
        ],
        jobs: [
          {
            title: "Data Analyst / AI Specialist",
            shortDescription: "Extract insights from big data and deploy machine learning models.",
            fullOverview: "Analyze business metrics, build predictive models, and communicate insights to leadership teams.",
            responsibilities: [
              "Clean and process raw datasets from SQL databases.",
              "Build statistical models and interactive dashboards in Tableau/PowerBI.",
              "Train machine learning models using Scikit-Learn and PyTorch."
            ],
            requiredSkills: ["Python", "SQL", "Tableau / PowerBI", "Pandas", "Machine Learning"],
            salaryRange: {
              entry: "₹5,00,000 - ₹9,50,000 PA",
              mid: "₹11,00,000 - ₹20,00,000 PA",
              senior: "₹24,00,000 - ₹45,00,000+ PA"
            },
            growthScope: "High demand across finance, e-commerce, healthcare, and AI research.",
            topRecruiters: ["Mu Sigma", "Fractal Analytics", "Tiger Analytics", "Deloitte", "Amazon"]
          }
        ]
      }
    ],
    generalAdvice: `Since your career goal is ${careerGoal || "a technical professional"}, complement your academic degree with real-world projects, GitHub repositories, and active community participation. Connect with alumni on DIRPA to ask specific course questions!`
  };
}

startServer();
