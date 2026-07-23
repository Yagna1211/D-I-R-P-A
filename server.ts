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

      Recommend 2 highly suitable and detailed educational routes. Suggest 2 alternative pathways they might not have considered. Provide general warm guidance. Your suggestions must reside in a JSON output mirroring the requested schema. Ensure the response is robust, practical, and highly suited to Indian & international student realities.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an expert educational counselor with deep knowledge of post-10th, post-12th and graduate level academic pathways, diplomas, entrance exams, and career roadmaps.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedPaths: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Official name of the academic major or pathway" },
                    description: { type: Type.STRING, description: "Brief description of this academic pathway" },
                    whyFits: { type: Type.STRING, description: "Detailed reasons why this specifically fits their interests and goals" },
                    estimatedFees: { type: Type.STRING, description: "Estimated average fees" },
                    subjects: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Core subjects involved in this path"
                    },
                    timeline: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Key milestones year-on-year"
                    },
                    careerPotential: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Potential job postings or titles"
                    }
                  },
                  required: ["name", "description", "whyFits", "estimatedFees", "subjects", "timeline", "careerPotential"]
                }
              },
              alternatives: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    whyAlternative: { type: Type.STRING }
                  },
                  required: ["name", "description", "whyAlternative"]
                }
              },
              generalAdvice: { type: Type.STRING, description: "Empathic counselor advice and action items" }
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
        name: level === "10th" ? "Intermediate MPC with Tech Focus" : "B.Tech Computer Science / Information Tech",
        description: `A fast-track engineering track centered around structural algorithms, computing platforms, and mathematical foundations suited for a career as ${careerGoal}.`,
        whyFits: `Matches your top interest in ${formatInterests} and utilizes your core strength in ${formatStrengths}. It aligns perfectly with your goal to become a ${careerGoal}.`,
        estimatedFees: budget === "low" ? "₹15,000 - ₹35,000/yr (Govt scholarship)" : "₹1,20,000 - ₹2,50,000/yr (Private)",
        subjects: ["Data Structures & Algorithms", "Mathematics & Computing", "Database Management", "Artificial Intelligence Foundations"],
        timeline: [
          "Year 1: Setup systems foundation and standard scripting languages",
          "Year 2: Master data structures, algorithmic puzzles, and take online bootcamps",
          "Year 3: Start live projects, open-source development, and internship roles",
          "Year 4: Finalize professional portfolios and drive technical placements"
        ],
        careerPotential: [
          careerGoal || "Software Innovator",
          "Full Stack Solutions Architect",
          "Systems Performance Auditor",
          "Data Infrastructure Specialist"
        ]
      },
      {
        name: level === "10th" ? "Polytechnic Diploma in Tech/Electronics" : "B.Des in Product Design / UI-UX Engineering",
        description: "An interactive, practical curriculum merging aesthetic design, user psychology, and direct system engineering.",
        whyFits: `Integrates your interest in ${formatInterests} with your logical strengths (${formatStrengths}) for a creative career.`,
        estimatedFees: budget === "high" ? "₹2,00,000/ye" : "₹40,000/yr",
        subjects: ["User-Centered Interaction Design", "Cognitive Psychology", "Modern Vector Styling", "Interface Prototyping"],
        timeline: [
          "Year 1: Deep dive into design principles, anatomy, and wireframe sketching",
          "Year 2: Practice software design components and join local design hackathons",
          "Year 3: Build an extensive online portfolio displaying case studies",
          "Year 4: Direct industry internship and starting junior roles"
        ],
        careerPotential: [
          "Lead UI/UX architect",
          "Cognitive systems researcher",
          "Interactive layout engineer",
          "Creative product manager"
        ]
      }
    ],
    alternatives: [
      {
        name: "Bachelor of Business Administration (BBA) with Informatics",
        description: "A business framework course analyzing commercial logistics, team architectures, and database tools.",
        whyAlternative: "Bridges the technical field with administrative business strategies, offering exceptional leadership avenues."
      },
      {
        name: "B.Sc. in Physics & Applied Mathematics",
        description: "A deeply theoretical pure sciences degree centering on computational vectors, physics, and deep math.",
        whyAlternative: "Provides excellent academic research credentials if you want to enter advanced modeling or national laboratories."
      }
    ],
    generalAdvice: `Since your goal is to be a ${careerGoal || "professional"}, always combine academic certificates with self-driven portfolios. Focus on your strength in ${formatStrengths} to solve hard problems! Build networks inside community programs like DIRPA, talk to verified alumni, and update your timeline regularly.`
  };
}

startServer();
