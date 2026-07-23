export interface CourseFeedback {
  user: string;
  role: string;
  avatarBg: string;
  comment: string;
  rating: number;
}

export interface JobVideo {
  title: string;
  description: string;
  duration: string;
  channel: string;
  thumbnailUrl: string;
  simulationDetails: string[];
}

export interface JobImage {
  url: string;
  caption: string;
  tasksIllustrated: string[];
}

export interface JobFeedback {
  user: string;
  company: string;
  experience: string;
  satisfaction: number;
  workLifeBalance: number;
}

export interface JobDetailInfo {
  id: string;
  title: string;
  description: string;
  salaryRange: string;
  entryLevelSalary: string;
  seniorLevelSalary: string;
  skillsRequired: string[];
  dayInLife: string[];
  pros: string[];
  cons: string[];
  feedback: JobFeedback[];
  images: JobImage[];
  videos: JobVideo[];
}

export interface SpecializationCourse {
  id: string;
  name: string;
  code: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Intense";
  keyFocusAreas: string[];
  feedback: CourseFeedback[];
  jobs: JobDetailInfo[];
}

export const DEGREE_SPECIALIZATION_MAP: Record<string, SpecializationCourse[]> = {
  "B.Tech/B.E (All Engineering Branches)": [
    {
      id: "btech_cse",
      name: "Computer Science & Engineering (CSE)",
      code: "CSE",
      description: "Comprehensive study of computation systems, standard algorithms, software development pipelines, database systems, machine learning engineering, and full-stack web architectures.",
      duration: "4 Years",
      difficulty: "Intense",
      keyFocusAreas: ["Data Structures & Algorithms", "Full Stack Web Development", "Cloud Architecture & Devops", "Machine Learning & AI Pipelines"],
      feedback: [
        {
          user: "Ananya Sharma",
          role: "B.Tech CSE Graduate 2024, now at Microsoft",
          avatarBg: "bg-teal-500",
          comment: "Extremely challenging but completely worth it! Focus on coding from day one, do not just memorize textbook concepts. Learn Git and work on real projects.",
          rating: 4.8
        },
        {
          user: "Rohan Varma",
          role: "3rd Year CSE Student, IIT Hyderabad",
          avatarBg: "bg-blue-500",
          comment: "Competitive coding can get stressful, but the industry demand is massive. Building side projects and web apps helped me crack an early internship.",
          rating: 4.2
        },
        {
          user: "Gautam Rao",
          role: "Systems Architect // Alumni 2018",
          avatarBg: "bg-indigo-600",
          comment: "CSE opens doors to remote work and global companies. Make sure to learn system design early if you want high-scale product roles.",
          rating: 5.0
        }
      ],
      jobs: [
        {
          id: "job_software_engineer",
          title: "Full-Stack Software Engineer",
          description: "Design, build, audit, and deploy high-performance web applications and cloud backend systems. Translates client requests into scalable code blocks.",
          salaryRange: "₹8,00,000 - ₹24,00,000 per annum",
          entryLevelSalary: "₹4,50,000 - ₹8,00,000 per annum",
          seniorLevelSalary: "₹18,00,000 - ₹45,00,000+ per annum",
          skillsRequired: ["TypeScript", "React & Next.js", "Node.js / Express", "PostgreSQL / MongoDB", "Git & CI/CD Pipelines"],
          dayInLife: [
            "09:30 AM - Morning Standup: Coordinate with the product owners and update team on ticket progress.",
            "10:30 AM - Development Session: Write clean, modular React frontend states and connect them to Express API routes.",
            "02:00 PM - Peer Code Review: Inspect pull requests filed by teammates and verify test suite pass rates.",
            "03:30 PM - Bug Triaging: Debug race condition states in the background web socket messaging loop.",
            "05:00 PM - Cloud Deployment: Run Docker containers and coordinate with DevOps onto AWS staging clusters."
          ],
          pros: [
            "Incredible compensation scaling potential",
            "Strong opportunities for remote work and global relocation",
            "Highly creative, building real products from blank code sheets"
          ],
          cons: [
            "Sedentary desk lifestyle with high screen-time strain",
            "Requires continuous retraining as frameworks become obsolete in 2-3 years",
            "Occasional high pressure around tight software product releases"
          ],
          feedback: [
            {
              user: "Priya Menon",
              company: "Razorpay Corporate Offices",
              experience: "The joy of pushing a feature live accessed by millions of users is unmatched. Sometimes release days get stressful, but the work-life balance is decent if you set boundaries.",
              satisfaction: 4.5,
              workLifeBalance: 4.0
            },
            {
              user: "Abhishek Goel",
              company: "Stripe Software Lab",
              experience: "Excellent pay and great remote benefits. You are evaluated on impact and clean architectural logic, which makes the work highly intellectual.",
              satisfaction: 4.9,
              workLifeBalance: 4.5
            }
          ],
          images: [
            {
              url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
              caption: "An engineer designing scalable layout states using a multiple monitor workspace configuration.",
              tasksIllustrated: ["Analyzing system performance statistics", "Writing complex modular TypeScript logic", "Testing components in local preview servers"]
            },
            {
              url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
              caption: "Collaborative interface designers and developer teams drafting wireframes on dynamic whiteboard panels.",
              tasksIllustrated: ["Aligning database schemas with user interfaces", "Conducting team agile sprint planning", "Sketching architecture state changes"]
            }
          ],
          videos: [
            {
              title: "A Day in the Life of a Google Software Engineer in Bengaluru",
              description: "Go behind the scenes at a high-tech campus. See how engineers plan features, collaborate on code reviews, and utilizes developer-friendly environments to solve problems.",
              duration: "8:25 mins",
              channel: "Tech Life Chronicles",
              thumbnailUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
              simulationDetails: [
                "Walking through the modern agile workspace clusters",
                "Demonstrating interactive debugging sessions using Chrome DevTools",
                "Explaining how microservices exchange payloads securely",
                "Showing social spaces and organic developer team huddles"
              ]
            }
          ]
        },
        {
          id: "job_ai_engineer",
          title: "AI / Machine Learning Engineer",
          description: "Develops statistical models, neural networks, and generative AI pipelines. Trains, evaluates, and deploys algorithms to unlock predictions from vast structured data pools.",
          salaryRange: "₹10,00,000 - ₹30,00,000 per annum",
          entryLevelSalary: "₹6,00,000 - ₹10,00,000 per annum",
          seniorLevelSalary: "₹22,00,000 - ₹50,00,000+ per annum",
          skillsRequired: ["Python", "PyTorch / TensorFlow", "Pandas & Scikit-Learn", "SQL & Vector Databases (Pinecone)", "Transformers & LLM Fine-tuning"],
          dayInLife: [
            "09:00 AM - Data Auditing: Cleanse and filter unstructured CSV records, matching training metadata.",
            "11:00 AM - Model Architecture Planning: Select dense layers and write standard convolutional filters in PyTorch.",
            "01:30 PM - Model Training Execution: Spin up heavy GPU clusters to run gradient descent training iterations.",
            "03:30 PM - Performance Evaluation: Plot Precision-Recall curves to detect bias overfitting risks.",
            "05:00 PM - API Endpoint Deployment: Wrap the compiled model weights into a lightning-fast FastAPI microservice."
          ],
          pros: [
            "Working at the cutting edge of modern artificial intelligence breakthroughs",
            "Highest compensation rates in current international markets",
            "Intellectually stimulating mathematical problem solving"
          ],
          cons: [
            "Frustrating periods of model divergence with zero intuitive answers",
            "Heavy emphasis on messy, unorganized dataset cleaning and pipeline debugging",
            "Huge cloud server cost pressure when running models"
          ],
          feedback: [
            {
              user: "Dr. Sandeep Patel",
              company: "Aditya AI Labs",
              experience: "You need a deep tolerance for trial-and-error. 90% of model experiments fail initially, but when you crack an 98% accuracy score and deploy it, the business transformation is absolute magic.",
              satisfaction: 4.7,
              workLifeBalance: 3.8
            }
          ],
          images: [
            {
              url: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80",
              caption: "An artificial intelligence researcher monitoring real-time loss curves on high-perf GPU matrix rigs.",
              tasksIllustrated: ["Reviewing standard tensor matrix multiplications", "Testing predictive modeling outputs", "Logging dataset anomalies"]
            }
          ],
          videos: [
            {
              title: "What Do Machine Learning Engineers Actually Do?",
              description: "A transparent look into the role. Explains the difference between software development and model training, covering feature engineering, and training metrics.",
              duration: "11:40 mins",
              channel: "AI Frontier Agency",
              thumbnailUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
              simulationDetails: [
                "Comparing traditional deterministic algorithms with weight backpropagation",
                "Visualizing neural activations using 3D plotting components",
                "Demonstrating Python scraping scripts and vector databases in real-time"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "btech_ece",
      name: "Electronics & Communication Engineering (ECE)",
      code: "ECE",
      description: "Focuses on semiconductor chips, VLSI layout design, standard analog/digital circuit boards, wireless cellular signal modulation, and hardware-software system interfaces.",
      duration: "4 Years",
      difficulty: "Hard",
      keyFocusAreas: ["Analog & Digital Electronics", "Microcontroller Architectures", "VLSI Circuit Layout Design", "RF Signal & Wireless Communication"],
      feedback: [
        {
          user: "Vignesh Prasad",
          role: "VLSI Layout Analyst, Qualcomm India",
          avatarBg: "bg-purple-600",
          comment: "ECE bridges the gap between hardware physics and code. If you want high-paying Core hardware roles, prioritize learning VLSI design models and Verilog early.",
          rating: 4.5
        },
        {
          user: "Megha Sreenivas",
          role: "Embedded Developer, Bosch India",
          avatarBg: "bg-pink-500",
          comment: "Excellent balance of circuits and software. We write low-level firmware in C and Assembly which directly controls electronics. Highly satisfying!",
          rating: 4.4
        }
      ],
      jobs: [
        {
          id: "job_vlsi_engineer",
          title: "VLSI Chip Design Engineer",
          description: "Model and design microchips, integrated circuits, and silicon processors that power everything from smart refrigerators to aerospace supercomputers.",
          salaryRange: "₹9,00,000 - ₹250,000 per annum",
          entryLevelSalary: "₹5,50,000 - ₹9,00,000 per annum",
          seniorLevelSalary: "₹20,00,000 - ₹45,00,000 per annum",
          skillsRequired: ["Verilog / SystemVerilog", "ASIC Design Workflows", "FPGA Programming", "Cadence Toolsets", "CMOS Physics"],
          dayInLife: [
            "09:00 AM - RTL Coding: Write functional circuit logic in SystemVerilog for a new multi-core digital audio controller.",
            "11:30 AM - Verification Testing: Run testbench configurations to inject random errors and ensure circuit bounds.",
            "02:00 PM - Synthesis Audits: Analyze gate count, power leak metrics, and circuit delay parameters using specialized Cadence tools.",
            "04:00 PM - Physical Floorplanning: Position transistor macros safely inside a microscopic silicon grid segment.",
            "05:30 PM - Signoff Verification: Audit thermal and resistance bounds block configurations before tapeout schedules."
          ],
          pros: [
            "Highly competitive core salaries with massive growth runway",
            "Working on tangible physical silicon modules that power the next decade",
            "Extremely high moat and industry barriers to entry ensuring solid job security"
          ],
          cons: [
            "Very costly errors; once silicon is manufactured, hotfixes are impossible",
            "Vast academic learning curve; requires meticulous physical accuracy",
            "Fewer remote work options due to heavy lab security protocols"
          ],
          feedback: [
            {
              user: "Naveen Kutty",
              company: "Intel Fabrication Labs",
              experience: "Seeing a chip you designed being soldered onto laptop motherboards is an extraordinary feeling. The precision required is immense, but the career security is ironclad.",
              satisfaction: 4.8,
              workLifeBalance: 4.1
            }
          ],
          images: [
            {
              url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
              caption: "An engineering specialist viewing high-resolution microchip layout structures under CAD setups.",
              tasksIllustrated: ["Routing copper lanes between macrocells", "Verifying gate timing parameters", "Running thermal heat dissipation maps"]
            }
          ],
          videos: [
            {
              title: "Inside the Silicon Chip Design Cleanroom",
              description: "A rare tour showing how cleanrooms fabricates microprocessor wafers. Details the lithography and physical timing analysis tools used by design teams.",
              duration: "13:10 mins",
              channel: "Core Electrical Review",
              thumbnailUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
              simulationDetails: [
                "Wearing full anti-static cleanroom jumpsuits",
                "Running robotic wafer silicon chemical baths",
                "Explaining electron microscope inspections",
                "Demonstrating chip testing scopes and wave oscillators"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "btech_eee",
      name: "Electrical & Electronics Engineering (EEE)",
      code: "EEE",
      description: "Focus on heavy machinery power systems, solar microgrid control, transformer distribution grids, vehicle powertrain systems, and electronic circuit boards.",
      duration: "4 Years",
      difficulty: "Hard",
      keyFocusAreas: ["Electrical Power Systems", "Control Systems & PLCs", "Heavy AC/DC Generators & Transformers", "Electric Vehicle (EV) Powertrains"],
      feedback: [
        {
          user: "Saurabh Mishra",
          role: "Grid Operations Engineer, NTPC Ltd",
          avatarBg: "bg-amber-600",
          comment: "EEE is mathematical and challenging. You deal with high-voltage machinery and solar converter boards. Pay attention to Power Electronics and Control Theory!",
          rating: 4.5
        },
        {
          user: "Archana Hegde",
          role: "EV Battery System Integrator",
          avatarBg: "bg-emerald-500",
          comment: "The shift to Electric Vehicles has revitalized EEE. Designing BMS (Battery Management Systems) is highly technical and has great global carrier values.",
          rating: 4.6
        }
      ],
      jobs: [
        {
          id: "job_ev_powertrain",
          title: "Electric Vehicle (EV) Systems Engineer",
          description: "Model and optimize the high-voltage battery modules, motor inverters, and battery management hardware inside electric cars and trucks.",
          salaryRange: "₹7,50,000 - ₹20,00,000 per annum",
          entryLevelSalary: "₹4,80,000 - ₹7,50,000 per annum",
          seniorLevelSalary: "₹16,00,000 - ₹35,00,000 per annum",
          skillsRequired: ["MATLAB / Simulink", "Battery Management Algorithms", "Power Converter Design", "CAN Bus Diagnostics", "High-Voltage Safety"],
          dayInLife: [
            "08:30 AM - Hardware Integration: Connect a high-voltage battery pack with a permanent magnet synchronous motor.",
            "10:30 AM - Simulation: Model thermal heat runaways inside MATLAB to test cell insulation during rapid charging cycles.",
            "01:00 PM - Firmware Tuning: Adjust switching frequencies on the silicon carbide (SiC) motor inverter.",
            "03:00 PM - Lab Testing: Attach current clamps and check transient voltage noise on an oscilloscope rig.",
            "04:30 PM - Diagnostic Review: Read CAN bus data packets to verify charge controller safety codes during braking scenarios."
          ],
          pros: [
            "Leading-edge green energy paradigm driving rapid global industry growth",
            "Excellent integration of heavy power physics with smart modern firmware control",
            "Superb opportunities with automotive pioneers (Tesla, Tata EV, Mahindra Aero)"
          ],
          cons: [
            "Real safety hazards; working with lethal 400V-800V DC power reserves",
            "Requires extensive lab testing schedules with long troubleshooting times",
            "High supply chain pressures around raw lithium and magnetic materials"
          ],
          feedback: [
            {
              user: "Divyansh Saxena",
              company: "Ola Electric Mobility Tech",
              experience: "Building battery packs that charges in 15 minutes without overheating is an extraordinary engineering puzzle. Every day is exciting and hands-on.",
              satisfaction: 4.7,
              workLifeBalance: 4.2
            }
          ],
          images: [
            {
              url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
              caption: "An engineering expert testing EV battery pack cooling systems and current terminal links.",
              tasksIllustrated: ["Aligning battery liquid cooling pipes", "Testing voltage balancer circuits", "Insulating terminal connection leads"]
            }
          ],
          videos: [
            {
              title: "Inside an Electric Car Battery Lab",
              description: "Explore how high-voltage lithium battery systems are assembled, programed, and safety-tested against drop and puncture crashes.",
              duration: "9:50 mins",
              channel: "Power Engineering Review",
              thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
              simulationDetails: [
                "Testing current surges using digital multi meters",
                "Inspecting battery warning lights and sensor chips",
                "Demonstrating emergency fire suppressor steps",
                "Showing fast charger interfaces and communications"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "btech_mech",
      name: "Mechanical Engineering (ME)",
      code: "ME",
      description: "Practical physics of material structures, fluid machinery mechanics, heating & cooling systems (HVAC), CNC manufacturing, and robotic motion controls.",
      duration: "4 Years",
      difficulty: "Hard",
      keyFocusAreas: ["Solid Mechanics & Materials Science", "CAD/CAM (SolidWorks & Catia)", "Thermodynamics & IC Engines", "Industrial Robotics & Automation"],
      feedback: [
        {
          user: "Rahul Deshmukh",
          role: "Design Lead, Larsen & Toubro",
          avatarBg: "bg-blue-600",
          comment: "Mechanical is the evergreen branch of engineering. Get excellent at 3D modeling tools like SolidWorks and structural analysis (Ansys) if you want design roles over heavy plant floor jobs.",
          rating: 4.2
        },
        {
          user: "Ankit Jha",
          role: "Senior Robotics Architect",
          avatarBg: "bg-amber-500",
          comment: "The future of Mech is robotics and composite materials. Combining structural design with servo controls makes you highly eligible for top smart factory roles.",
          rating: 4.5
        }
      ],
      jobs: [
        {
          id: "job_robotics_inter",
          title: "Robotics Design & Integration Specialist",
          description: "Design structural framing, link actuators, and deploy automated robotic arms on state-of-the-art manufacturing lines and sorting centers.",
          salaryRange: "₹6,50,000 - ₹18,00,000 per annum",
          entryLevelSalary: "₹4,20,000 - ₹6,50,000 per annum",
          seniorLevelSalary: "₹14,00,000 - ₹30,00,000 per annum",
          skillsRequired: ["SolidWorks / Autodesk Inventor", "Kinematics & Linkage Design", "PLC Programming", "Pneumatics & Hydraulic Systems", "Structural Finite Element Analysis (FEA)"],
          dayInLife: [
            "08:00 AM - Design Session: Model a lightweight aluminum end-effector claw using SolidWorks layout tools.",
            "10:30 AM - Simulation: Run stress load projections (FEA) to confirm the robot arm will not twist at high speeds.",
            "01:00 PM - Workshop Implementation: Assemble precise planetary gearbox motors, tightening feedback encoders.",
            "03:00 PM - Programming: Write logic statements on a PLC touch module to synchronize robotic picking speed with conveyor belts.",
            "04:30 PM - Calibration: Fine-tune coordinate paths using laser indicators to ensure pick-accuracy within 0.1mm."
          ],
          pros: [
            "Highly satisfying tactile engineering; watching massive machinery carry out precise routines you programmed",
            "Excellent long-term stability with core industrial operations",
            "Fascinating crossover with artificial intelligence and smart automation systems"
          ],
          cons: [
            "Requires physical on-site presence in hot, noisy factory settings",
            "Slow iteration times; material procurement and custom fabrication takes weeks",
            "Tighter starting margins compared to purely software fields"
          ],
          feedback: [
            {
              user: "Abhay Patil",
              company: "Fanuc Robotics Systems",
              experience: "Deploying automated robots that paint car chassis in 12 seconds with absolute consistency is incredible. You see the immediate physical impact of your code and layout designs.",
              satisfaction: 4.6,
              workLifeBalance: 3.9
            }
          ],
          images: [
            {
              url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
              caption: "An automation engineer calibrating a multi-axis pick-and-place industrial arm manipulator.",
              tasksIllustrated: ["Aligning electronic feedback encoders", "Tuning pneumatic valve feed air speeds", "Lubricating joint rotational bearings"]
            }
          ],
          videos: [
            {
              title: "Testing Heavy Industrial Robots on Assembly Floors",
              description: "Watch how mechanical designers calibrate mechanical links, and write automated commands on manufacturing floors.",
              duration: "10:45 mins",
              channel: "Machinery & Kinetics Hub",
              thumbnailUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
              simulationDetails: [
                "Adjusting structural links with dial caliper rulers",
                "Setting software coordinates using mobile control pendants",
                "Demonstrating emergency light-curtain fence controls",
                "Measuring joint load spikes when moving heavy castings"
              ]
            }
          ]
        }
      ]
    }
  ],
  "MBBS": [
    {
      id: "mbbs_gen",
      name: "General Medicine & Clinical Surgery",
      code: "Clinical Medicine",
      description: "Foundational clinical surgery, pharmaceutical medicine, physical diagnosis, anatomical dissection, emergency care, and holistic healthcare operations.",
      duration: "5.5 Years",
      difficulty: "Intense",
      keyFocusAreas: ["Human Anatomy & Physiology", "Pathology & Microbiology", "Pharmacology & Drug Dosage", "Internal Medicine & Surgery Clinicals"],
      feedback: [
        {
          user: "Dr. Kavitha Mohan",
          role: "MBBS Graduate, Resident Intern, Bangalore Medical College",
          avatarBg: "bg-teal-500",
          comment: "Mbbs is a long marathon. The workload during the internship year is monumental with 36-hour shifts, but saving your first patient makes every sleepless night trivial.",
          rating: 4.9
        },
        {
          user: "Dr. Ayush Goyal",
          role: "General Medical Practitioner // Alumni 2015",
          avatarBg: "bg-blue-600",
          comment: "Develop deep empathy. Medical books are vast, but clinical diagnosis is an art of listening to patient stories carefully. Keep learning!",
          rating: 4.7
        }
      ],
      jobs: [
        {
          id: "job_medical_officer",
          title: "General Medical Officer (GP)",
          description: "Diagnose diseases, formulate treatment protocols, prescribe medications, coordinate emergency stabilization, and manage overall community ward clinics.",
          salaryRange: "₹9,00,000 - ₹18,00,000 per annum",
          entryLevelSalary: "₹6,50,000 - ₹9,50,000 per annum",
          seniorLevelSalary: "₹16,00,000 - ₹30,00,000 per annum",
          skillsRequired: ["Physical Diagnosis", "Emergency Traumatology", "Pharmacological Treatment Layouts", "Cardiopulmonary Resuscitation (CPR)", "Patient Empathy & Communication"],
          dayInLife: [
            "08:00 AM - Ward Rounds: Visit emergency ward beds, monitoring blood metrics and adjusting treatment drips.",
            "10:00 AM - Outpatient (OPD): Consult with over 40 diverse cases (chronic hypertension, common fevers, abdominal pains).",
            "01:30 PM - Emergency Triage: Stabilize a head-injury motor vehicle accident victim, stopping bleeding and requesting CT scans.",
            "03:30 PM - Clinical Minor OT: Perform clean sutures on deep skin cuts and inject nerve-block local anesthetics.",
            "05:00 PM - Case File Documentation: Fill statutory health records and coordinate patient discharge metrics."
          ],
          pros: [
            "Highest level of societal respect and direct human impact",
            "Virtually zero recession risk; permanent and absolute healthcare demand",
            "Vast career specialization routes (Cardiology, Neurosurgery, Pediatrics)"
          ],
          cons: [
            "Huge physical strain from extremely long 24-36 hour on-call rotations",
            "High emotional fatigue interacting with critical illnesses and distress daily",
            "Extremely long academic timeline (5.5 years MBBS + 3 years MD specialization)"
          ],
          feedback: [
            {
              user: "Dr. Shalini Swamy",
              company: "Apollo Corporate Hospitals",
              experience: "The hours are grueling, and clinical responsibility is immense. But when a patient you treated walks out fully recovered, thanking you with tears in their eyes—there is absolutely no career matching that satisfaction.",
              satisfaction: 4.9,
              workLifeBalance: 3.0
            }
          ],
          images: [
            {
              url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
              caption: "A physician reviewing human anatomical maps and patient diagnostic data files.",
              tasksIllustrated: ["Analyzing radiographic bone structures", "Prescribing localized drug mixtures", "Explaining disease progression parameters"]
            }
          ],
          videos: [
            {
              title: "A Day in the Life of a Medical Intern in India",
              description: "Follow a clinical resident doctor. Experience the fast-paced atmosphere during emergency intake, ward rounds, minor stitching ops, and medical board syncs.",
              duration: "14:20 mins",
              channel: "Medical Insights Network",
              thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
              simulationDetails: [
                "Taking dynamic blood pressure measurements",
                "Demonstrating surgical scrubs disinfection steps",
                "Explaining diagnostic blood markers and charts",
                "Showing on-call nurse coordination meetings"
              ]
            }
          ]
        }
      ]
    }
  ],
  "B.Com (Honors)": [
    {
      id: "bcom_finance",
      name: "Finance, Audit & Investment Analysis",
      code: "Finance",
      description: "Advanced accounting ledger auditing, direct tax planning laws, risk modeling architectures, corporate portfolio valuations, and stock-market computations.",
      duration: "3 Years",
      difficulty: "Medium",
      keyFocusAreas: ["Corporate Accounting Ledger", "Statutory Taxation Laws (GST & Incometax)", "Financial Risk Modeling", "Statutory Audit Foundations"],
      feedback: [
        {
          user: "Tanmay Roy",
          role: "Risk Consultant, Deloitte India",
          avatarBg: "bg-blue-600",
          comment: "B.Com Honors is a powerful foundation. Do not just read theoretical ledgers; learn Excel modeling, financial reports analysis, and study for CA/FRM alongside for top packages.",
          rating: 4.4
        }
      ],
      jobs: [
        {
          id: "job_finance_analyst",
          title: "Corporate Financial Analyst",
          description: "Forecast company budgets, analyze operational expenditures, perform financial ratios modeling on Excel, and suggest investment strategies directly to directors.",
          salaryRange: "₹5,00,000 - ₹14,00,000 per annum",
          entryLevelSalary: "₹3,60,000 - ₹5,50,000 per annum",
          seniorLevelSalary: "₹12,00,000 - ₹26,00,000 per annum",
          skillsRequired: ["Advanced MS Excel", "Financial Statement Analysis", "Data Visualization (Tableau/PowerBI)", "Corporate Tax Frameworks", "Valuation modeling"],
          dayInLife: [
            "09:00 AM - Ledger Auditing: Download monthly cash balance books and identify anomalous expense lines.",
            "11:00 AM - Model Building: Update corporate forecast templates, predicting profit margin under 5% raw material inflation scenarios.",
            "01:30 PM - Board Deck Drafting: Build elegant charts displaying corporate debt patterns for quarterly investor calls.",
            "03:30 PM - Tax Filing Audit: Coordinate with external Chartered Accountants, clarifying regional trade GST tax writeoffs.",
            "04:45 PM - Allocation Review: Sync with the procurement head, verifying budget margins for new server stack license buying."
          ],
          pros: [
            "Comfortable, corporate air-conditioned office environment with structured schedules",
            "Clear vertical hierarchy leading to senior Chief Financial Officer (CFO) status",
            "Immediate applicability of personal financial, investment, and tax knowledge"
          ],
          cons: [
            "Extremely repetitive work dealing with massive spreadsheets and row validation",
            "Severe workload stress during March-April financial closing periods",
            "Low entry-level salary tiers unless graduating from tier-1 elite institutions"
          ],
          feedback: [
            {
              user: "Nisha Kapoor",
              company: "KPMG Advisory Services",
              experience: "The corporate culture is high-profile, and reading market balance sheets is fascinating. Excel is literally our canvas. The hours get long during quarterly filings, but the path is very rewarding.",
              satisfaction: 4.4,
              workLifeBalance: 3.7
            }
          ],
          images: [
            {
              url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
              caption: "A financial analyst plotting dynamic cashflow trend lines on data dashboard screens.",
              tasksIllustrated: ["Analyzing revenue sheet tables", "Generating tax compliance reports", "Modeling business expansion assets"]
            }
          ],
          videos: [
            {
              title: "What is Corporate Finance and Audit Intern Life Like?",
              description: "Experience the corporate routine. See how financial analysts verify ledger balances, model company assets, and draft investment balance sheets.",
              duration: "8:50 mins",
              channel: "Wall Street Prep Network",
              thumbnailUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
              simulationDetails: [
                "Writing lookup algorithms in Microsoft Excel sheets",
                "Explaining cashflow calculations and metrics",
                "Showing team corporate planning presentations",
                "Demonstrating automated financial reporting systems"
              ]
            }
          ]
        }
      ]
    }
  ],
  "BCA": [
    {
      id: "bca_software",
      name: "Software & Mobile Web Development",
      code: "Software Tech",
      description: "Practical software development pipelines, database query design, lightweight coding frameworks, mobile app architectures, and system diagnostics.",
      duration: "3 Years",
      difficulty: "Medium",
      keyFocusAreas: ["Object Oriented Programming (Java/Python)", "Relational Databases & SQL", "Mobile App Development", "UI/UX Layout Concepts"],
      feedback: [
        {
          user: "Hemanth Rao",
          role: "Full-Stack Dev, TCS Bangalore",
          avatarBg: "bg-sky-500",
          comment: "BCA focuses heavily on software application code. It is an excellent fast 3-year option. Make sure to learn standard JS environments: Node, React, and MongoDB to stand out.",
          rating: 4.3
        }
      ],
      jobs: [
        {
          id: "job_bca_developer",
          title: "Mobile Application Developer",
          description: "Build, configure, test, and style mobile apps for iOS and Android platforms inside Flutter, React Native, or Native Swift environments.",
          salaryRange: "₹4,50,000 - ₹12,00,000 per annum",
          entryLevelSalary: "₹3,20,000 - ₹5,00,000 per annum",
          seniorLevelSalary: "₹10,00,000 - ₹22,00,000 per annum",
          skillsRequired: ["Dart / Flutter", "JSON Payload Exchanges", "Firebase Core Services", "Xcode & Android Studio", "Git Control"],
          dayInLife: [
            "09:15 AM - Standup: Brief developers on widget touch-gesture bug resolving plans.",
            "10:00 AM - Code Session: Write Dart classes to fetch user lists from AWS server databases.",
            "01:30 PM - Layout Tuning: Align touch targets, ensuring margins conform to Material Design rules.",
            "03:15 PM - Push Notifications: Set up standard Firebase alerts to re-engage resting app users.",
            "04:45 PM - Release Testing: Run virtual app configurations in Android Studio emulators to ensure backward device support."
          ],
          pros: [
            "Fascinating crossover with high-growth consumer apps and consumer trends",
            "Shorter 3-year academic entry bypass directly into tech sectors",
            "Great freelancing opportunities inside global contractor platforms (Upwork)"
          ],
          cons: [
            "Lower starting wage ranks compared to 4-year B.Tech grads initially",
            "Meticulous, repetitive debugging of cellular UI screen scaling bugs",
            "Slower promotion tracks in old IT firms unless updated with master MCA classes"
          ],
          feedback: [
            {
              user: "Ganesh K",
              company: "Zepto Delivery Tech",
              experience: "Excellent, practical and fast career launcher. We write direct customer-facing widgets. If you build real apps on Github, recruiters find you instantly.",
              satisfaction: 4.5,
              workLifeBalance: 4.1
            }
          ],
          images: [
            {
              url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
              caption: "An app designer checking custom interface renders on virtual simulator screens.",
              tasksIllustrated: ["Aligning layout spacing grids", "Checking memory leak logs", "Deploying dynamic widgets"]
            }
          ],
          videos: [
            {
              title: "Day in the Life of a Flutter Mobile App Developer",
              description: "See how mobile developers build fluid gesture layouts, connect Firebase databases, and package apps for Play Store deployment.",
              duration: "7:40 mins",
              channel: "Coding & Mobile Review",
              thumbnailUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
              simulationDetails: [
                "Drafting cross-platform layouts in visual studios",
                "Running live emulator reloads on virtual phone modules",
                "Fixing database credential errors",
                "Publishing updates live to app test servers"
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const getFallbackSpecializations = (degreeName: string): SpecializationCourse[] => {
  return [
    {
      id: "fallback_spec_1",
      name: `Core Professional Track in ${degreeName}`,
      code: "SPEC-01",
      description: `Comprehensive core specialisation track optimized for graduates of the ${degreeName}. Core focus centers on advanced statutory methodologies, leadership models, and technological integration.`,
      duration: "Standard Duration",
      difficulty: "Medium",
      keyFocusAreas: ["Advanced Systems Design", "Strategic Operations", "Industry standards", "Compliance & Audit"],
      feedback: [
        {
          user: "Venkata Raman",
          role: "Senior Consultant // Alumni 2022",
          avatarBg: "bg-slate-700",
          comment: "Highly structure course that bridges theory with actual industrial projects. Focus on building hands-on experience and solid portfolio assets alongside.",
          rating: 4.6
        },
        {
          user: "Swapna Patil",
          role: "General Manager",
          avatarBg: "bg-emerald-600",
          comment: "Excellent syllabus focused on real-world industrial demands. Ensure you practice practical case files thoroughly.",
          rating: 4.5
        }
      ],
      jobs: [
        {
          id: "fallback_job_1",
          title: `Associate Executive Specialist`,
          description: `Supervise production workflows, monitor data frameworks, configure specialized instruments, and audit operational structures within the standard corporate workspace.`,
          salaryRange: "₹5,00,000 - ₹12,00,000 per annum",
          entryLevelSalary: "₹3,50,000 - ₹5,00,000 per annum",
          seniorLevelSalary: "₹10,00,000 - ₹22,00,000 per annum",
          skillsRequired: ["Practical problem solving", "Analytical tracking", "Tool calibration", "Team coordination"],
          dayInLife: [
            "09:00 AM - Checklists & Audting: Formulate team task targets and inspect ongoing project logs.",
            "11:00 AM - Technical Operations: Configure system settings, verifying accuracy bounds.",
            "02:00 PM - Collaboration session: Sync with administrative heads, presenting field performance reports.",
            "04:00 PM - Safety & Compliance check: Run audits to ensure conformance with standards."
          ],
          pros: [
            "Excellent job predictability and career security",
            "Direct path into team management and operational directorships",
            "High opportunity to work with premium industrial materials"
          ],
          cons: [
            "Requires consistent, rigorous tracking and repetitive data logs",
            "Higher friction around manual compliance and regulatory checks"
          ],
          feedback: [
            {
              user: "Nikhil Joshi",
              company: "Premier Operations Group",
              experience: "The operational scale is massive. You coordinates with multiple departments, ensuring smooth flowcharts. It's a highly valued executive role.",
              satisfaction: 4.5,
              workLifeBalance: 4.0
            }
          ],
          images: [
            {
              url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
              caption: "An engineering coordinator verifying system models on diagnostic tracking systems.",
              tasksIllustrated: ["Analyzing system performance profiles", "Aligning metrics tables", "Supervising field metrics"]
            }
          ],
          videos: [
            {
              title: "What is Executive Operations and Logistics Like?",
              description: "Go behind the scenes of professional workflow systems. Review structural schedules, automated monitors, and team sync routines.",
              duration: "7:15 mins",
              channel: "Executive Careers Vlog",
              thumbnailUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
              simulationDetails: [
                "Running checks on visual analytics dashboards",
                "Coordinating terminal cargo flow and team rosters",
                "Fixing scheduling issues live during operation sprints"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "fallback_spec_2",
      name: `Strategic Research & Development Stream`,
      code: "R&D-02",
      description: `Targeted academic and research specialized track inside ${degreeName} covering analytical methodologies, theoretical studies, and custom prototype modeling.`,
      duration: "Standard Duration",
      difficulty: "Hard",
      keyFocusAreas: ["Advanced Research Methodologies", "Statistical Modeling", "Modern tech frameworks", "Corporate policy"],
      feedback: [
        {
          user: "Dr. Arundhati Roy",
          role: "Head Researcher // Scientific Council",
          avatarBg: "bg-fuchsia-600",
          comment: "This track values intellectual curiosity, writing papers, and designing models. Great route if you plan to get PhDs or join advanced product research divisions.",
          rating: 4.7
        }
      ],
      jobs: [
        {
          id: "fallback_job_2",
          title: `R&D and Analytics Supervisor`,
          description: `Direct research studies, analyze statistical datasets, design prototype experiments, and collaborate directly with senior design directorships inside industrial research centers.`,
          salaryRange: "₹6,00,000 - ₹15,00,000 per annum",
          entryLevelSalary: "₹4,00,000 - ₹6,00,000 per annum",
          seniorLevelSalary: "₹12,00,000 - ₹28,00,000 per annum",
          skillsRequired: ["Analytical modeling", "Python / R statistical computing", "Technical writing and research layouts", "Experiment verification standard designs"],
          dayInLife: [
            "09:00 AM - Literature Review: Study published reports on structural performance modifications.",
            "11:00 AM - Experiment Setup: Configure variables on measurement sensors to test prototype strength metrics.",
            "02:00 PM - Computation analysis: Process data logs on R Studio arrays, checking statistical correlation scores.",
            "04:15 PM - Report Sync: Present analytical progress updates to corporate engineering chiefs."
          ],
          pros: [
            "Extremely high intellectual challenge with creative problem solving parameters",
            "Prestige of pioneering new methods, patterns, or patents in your field",
            "Generous funding and specialized equipment accessibility"
          ],
          cons: [
            "Results take a long time to materialize; projects may go years before success",
            "Highly competitive funding models requiring heavy document writing"
          ],
          feedback: [
            {
              user: "Shreyas Iyer",
              company: "National Research Org",
              experience: "Excellent environment with stellar intellectual freedom. You are surrounded by top experts. The focus is strictly on data, logic and discovery.",
              satisfaction: 4.6,
              workLifeBalance: 4.2
            }
          ],
          images: [
            {
              url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
              caption: "A research advisor compiling statistical graphs on mathematical models.",
              tasksIllustrated: ["Analyzing correlation algorithms", "Writing research outlines", "Configuring lab parameters"]
            }
          ],
          videos: [
            {
              title: "What Happens inside Scientific Labs?",
              description: "Watch how material properties, cell matrices, or software systems are analyzed and evaluated inside world-class scientific facilities.",
              duration: "9:30 mins",
              channel: "Research Frontier Agency",
              thumbnailUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
              simulationDetails: [
                "Tuning optical magnification gears on analytical sensors",
                "Analyzing statistical distribution bells using charting scripts",
                "Demonstrating laboratory compound mix methods under biosafety hoods"
              ]
            }
          ]
        }
      ]
    }
  ];
};
