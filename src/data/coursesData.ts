import { AcademicPathway, AlumniInsight } from '../types';

export interface IntermediateGroup {
  code: string;
  name: string;
  subjects: string[];
  nextStudies: string[];
}

export interface PolytechnicDiploma {
  id: string;
  name: string;
  isEngineering: boolean;
  lateralBTech: string;
  description: string;
}

export interface ITIVocationalTrade {
  name: string;
  type: 'ITI - Engineering' | 'ITI - Non-Engineering' | 'Vocational';
  duration: string;
  certification: string;
  description: string;
  careerPath: string;
}

// 85 Intermediate groups parsed from the direct real Andhra Pradesh / national list
export const INTERMEDIATE_GROUPS: IntermediateGroup[] = [
  { code: '001', name: 'MPC', subjects: ['Maths-A', 'Maths-B', 'Physics', 'Chemistry'], nextStudies: ['B.Tech', 'B.E', 'B.Arch', 'BCA', 'B.Sc (Maths/Physics/Chemistry/CS)', 'B.Stat', 'BBA', 'B.Com', 'NDA', 'Merchant Navy', 'CA', 'CS', 'CMA'] },
  { code: '002', name: 'MEC', subjects: ['Maths-A', 'Maths-B', 'Economics', 'Commerce'], nextStudies: ['B.Com', 'BBA', 'BMS', 'BBM', 'BCA', 'B.Sc Statistics', 'Economics', 'Data Science', 'CA', 'CS', 'CMA', 'Law'] },
  { code: '003', name: 'BPC', subjects: ['Botany', 'Zoology', 'Physics', 'Chemistry'], nextStudies: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BUMS', 'BPT', 'B.Pharm', 'Pharm.D', 'B.Sc Nursing', 'Agriculture', 'Veterinary', 'Biotechnology', 'Microbiology', 'Forensic Science', 'CA', 'CS', 'CMA'] },
  { code: '004', name: 'CEC', subjects: ['Economics', 'Commerce', 'Civics', '-'], nextStudies: ['B.Com', 'BBA', 'BMS', 'BBM', 'BA', 'BSW', 'Journalism', 'Hotel Management', 'CA', 'CS', 'CMA', 'Law'] },
  { code: '005', name: 'HEC', subjects: ['Economics', 'History', 'Civics', '-'], nextStudies: ['BA', 'BSW', 'Journalism', 'Psychology', 'Political Science', 'History', 'Public Administration', 'Law', 'Hotel Management'] },
  { code: '006', name: 'ECH', subjects: ['Economics', 'Commerce', 'History', '-'], nextStudies: ['B.Com', 'BBA', 'BA Economics', 'CA', 'CS', 'CMA', 'Law'] },
  { code: '007', name: 'ECG', subjects: ['Economics', 'Commerce', 'Geography', '-'], nextStudies: ['BA Geography', 'Economics', 'BBA', 'B.Com', 'Tourism', 'Civil Services preparation', 'Law'] },
  { code: '008', name: 'HCML(TEL)', subjects: ['History', 'Civics', 'ML-Telugu', '-'], nextStudies: ['BA History', 'ML-Telugu Literature', 'Law', 'Civil Services'] },
  { code: '009', name: 'HCML(U)', subjects: ['History', 'Civics', 'ML-Urdu', '-'], nextStudies: ['BA Urdu', 'History', 'Social Work'] },
  { code: '010', name: 'HCML(H)', subjects: ['History', 'Civics', 'ML-Hindi', '-'], nextStudies: ['BA Hindi Literature', 'Journalism', 'Civil Services'] },
  { code: '011', name: 'HCML(TA)', subjects: ['History', 'Civics', 'ML-Tamil', '-'], nextStudies: ['BA Tamil', 'History', 'Law'] },
  { code: '012', name: 'HCML(M)', subjects: ['History', 'Civics', 'ML-Marathi', '-'], nextStudies: ['BA Marathi', 'History', 'Social Work'] },
  { code: '013', name: 'HCML(K)', subjects: ['History', 'Civics', 'ML-Kannada', '-'], nextStudies: ['BA Kannada', 'Public Administration', 'Law'] },
  { code: '014', name: 'HCML(O)', subjects: ['History', 'Civics', 'ML-Oriya', '-'], nextStudies: ['BA Oriya', 'Social Sciences'] },
  { code: '015', name: 'HCML(E)', subjects: ['History', 'Civics', 'ML-English', '-'], nextStudies: ['BA English Literature', 'Journalism', 'Mass Communication'] },
  { code: '016', name: 'EC SOCIO', subjects: ['Economics', 'Civics', 'Sociology', '-'], nextStudies: ['BA Sociology', 'Social Work', 'Psychology', 'Public Administration', 'Law'] },
  { code: '017', name: 'HC SOCIO', subjects: ['History', 'Civics', 'Sociology', '-'], nextStudies: ['BA Sociology', 'History', 'Political Science', 'Social Work', 'Law'] },
  { code: '018', name: 'ME LO', subjects: ['Maths-A', 'Maths-B', 'Economics', 'Logic'], nextStudies: ['B.Com', 'BBA', 'BCA', 'Statistics', 'Economics', 'Data Science', 'CA', 'CS', 'CMA'] },
  { code: '019', name: 'GO PHY CHE', subjects: ['Geology', 'Physics', 'Chemistry', '-'], nextStudies: ['Geology', 'Earth Sciences', 'Mining Engineering', 'Environmental Science', 'B.Sc Geology'] },
  { code: '020', name: 'PHY CHE HO SCI', subjects: ['Physics', 'Chemistry', 'Home Science', '-'], nextStudies: ['Home Science', 'Nutrition', 'Food Technology', 'Fashion Technology', 'B.Sc Chemistry'] },
  { code: '021', name: 'ECO LO CO', subjects: ['Economics', 'Logic', 'Commerce', '-'], nextStudies: ['B.Com', 'BBA', 'Law', 'CA', 'CS', 'CMA'] },
  { code: '022', name: 'ECO LO HIS', subjects: ['Economics', 'Logic', 'History', '-'], nextStudies: ['BA History', 'Law', 'Public Administration', 'Civil Services'] },
  { code: '023', name: 'ECO CO PUB', subjects: ['Economics', 'Commerce', 'Public Admn', '-'], nextStudies: ['B.Com', 'BBA', 'Public Administration', 'CA', 'CS'] },
  { code: '024', name: 'ECO CO ML-TEL', subjects: ['Economics', 'Commerce', 'ML-Telugu', '-'], nextStudies: ['B.Com', 'BA Telugu', 'Journalism'] },
  { code: '025', name: 'ECML(U)', subjects: ['Economics', 'Commerce', 'ML-Urdu', '-'], nextStudies: ['B.Com', 'BA Urdu', 'Translation'] },
  { code: '026', name: 'ECML(H)', subjects: ['Economics', 'Commerce', 'ML-Hindi', '-'], nextStudies: ['B.Com', 'BA Hindi', 'Translation'] },
  { code: '027', name: 'ECML(T)', subjects: ['Economics', 'Commerce', 'ML-Tamil', '-'], nextStudies: ['B.Com', 'BA Tamil', 'Law'] },
  { code: '028', name: 'ECML(M)', subjects: ['Economics', 'Commerce', 'ML-Marathi', '-'], nextStudies: ['B.Com', 'BA Marathi', 'Civil Services'] },
  { code: '029', name: 'ECML(K)', subjects: ['Economics', 'Commerce', 'ML-Kannada', '-'], nextStudies: ['B.Com', 'BA Kannada', 'Public Relations'] },
  { code: '030', name: 'ECML(O)', subjects: ['Economics', 'Commerce', 'ML-Oriya', '-'], nextStudies: ['B.Com', 'BA Oriya', 'Social Work'] },
  { code: '031', name: 'ECO ML-ENG', subjects: ['Economics', 'Commerce', 'ML-English', '-'], nextStudies: ['BA English', 'BBA', 'Journalism', 'Corporate Relations'] },
  { code: '032', name: 'ECO HIS SOC', subjects: ['Economics', 'History', 'Sociology', '-'], nextStudies: ['Sociology', 'Social Work', 'Psychology', 'BA Economics'] },
  { code: '033', name: 'ECO HIS GEO', subjects: ['Economics', 'History', 'Geography', '-'], nextStudies: ['Geography', 'Economics', 'Tourism', 'Urban Planning'] },
  { code: '034', name: 'GHML(TEL)', subjects: ['Economics', 'History', 'ML-Telugu', '-'], nextStudies: ['BA Telugu', 'History', 'Social Work'] },
  { code: '035', name: 'GHML(U)', subjects: ['Economics', 'History', 'ML-Urdu', '-'], nextStudies: ['BA Urdu', 'History', 'Journalism'] },
  { code: '036', name: 'GHML(H)', subjects: ['Economics', 'History', 'ML-Hindi', '-'], nextStudies: ['BA Hindi', 'History', 'Teaching'] },
  { code: '037', name: 'GHML(T)', subjects: ['Economics', 'History', 'ML-Tamil', '-'], nextStudies: ['BA Tamil', 'History', 'Tourism'] },
  { code: '038', name: 'GHML(M)', subjects: ['Economics', 'History', 'ML-Marathi', '-'], nextStudies: ['BA Marathi', 'History', 'Archival Science'] },
  { code: '039', name: 'GHML(K)', subjects: ['Economics', 'History', 'ML-Kannada', '-'], nextStudies: ['BA Kannada', 'History', 'Social Welfare'] },
  { code: '040', name: 'GHML(O)', subjects: ['Economics', 'History', 'ML-Oriya', '-'], nextStudies: ['BA Oriya', 'History'] },
  { code: '041', name: 'GHML(E)', subjects: ['Economics', 'History', 'ML-English', '-'], nextStudies: ['BA English', 'History', 'Media & Arts'] },
  { code: '042', name: 'ECO HIS MUS', subjects: ['Economics', 'History', 'Music', '-'], nextStudies: ['Music', 'Performing Arts', 'Fine Arts', 'BA'] },
  { code: '043', name: 'ECO CIV PUB', subjects: ['Economics', 'Civics', 'History', 'Public Admn'], nextStudies: ['Public Administration', 'Political Science', 'Law', 'Civil Services'] },
  { code: '044', name: 'LO HIS CIV', subjects: ['Logic', 'History', 'Civics', '-'], nextStudies: ['Law', 'Public Administration', 'History', 'Political Science'] },
  { code: '045', name: 'CO CIV PUB', subjects: ['Commerce', 'Commerce', 'Public Admn', '-'], nextStudies: ['B.Com', 'BBA', 'Public Administration', 'CA', 'CS'] },
  { code: '046', name: 'HIS CIV GEO', subjects: ['History', 'Civics', 'Geography', '-'], nextStudies: ['Geography', 'Urban Planning', 'Archaeology', 'Tourism'] },
  { code: '047', name: 'HIS CIV PUB', subjects: ['History', 'Civics', 'Public Admn', '-'], nextStudies: ['Political Science', 'Public Administration', 'Law'] },
  { code: '048', name: 'HIS CIV CL-SAN', subjects: ['History', 'Civics', 'CL-Sanskrit', '-'], nextStudies: ['BA Sanskrit', 'History', 'Teaching', 'Linguistics'] },
  { code: '049', name: 'HIS CIV CL PER', subjects: ['History', 'Civics', 'CL-Persian', '-'], nextStudies: ['BA Persian', 'Archival history', 'Civil services'] },
  { code: '050', name: 'HIS CIV ARA', subjects: ['History', 'Civics', 'CL-Arabic', '-'], nextStudies: ['BA Arabic', 'Islamic history', 'Interpretation'] },
  { code: '051', name: 'HIS CIV MUS', subjects: ['History', 'Civics', 'Music', '-'], nextStudies: ['BA Music', 'Fine arts', 'Performing arts'] },
  { code: '052', name: 'HIS ML-TEL CL-SAN', subjects: ['History', 'ML-Telugu', 'CL-Sanskrit', '-'], nextStudies: ['BA Telugu/Sanskrit', 'History', 'Journalism'] },
  { code: '053', name: 'HIS ML-TEL CL-PER', subjects: ['History', 'ML-Telugu', 'CL-Persian', '-'], nextStudies: ['BA Telugu', 'Linguistics'] },
  { code: '054', name: 'HIS ML-TEL CL-ARA', subjects: ['History', 'ML-Telugu', 'CL-Arabic', '-'], nextStudies: ['BA Telugu', 'Linguistics'] },
  { code: '055', name: 'HIS ML-TEL MUS', subjects: ['History', 'ML-Telugu', 'Music', '-'], nextStudies: ['Musicology', 'BA performing arts', 'Teaching'] },
  { code: '056', name: 'HIS ML-U CL-SAN', subjects: ['History', 'ML-Urdu', 'CL-Sanskrit', '-'], nextStudies: ['BA Urdu', 'Linguistics', 'Sanskrit'] },
  { code: '057', name: 'HIS ML-U CL-PER', subjects: ['History', 'ML-Urdu', 'CL-Persian', '-'], nextStudies: ['BA Urdu', 'Persian literature', 'Translation studies'] },
  { code: '058', name: 'HIS ML-U CL-ARA', subjects: ['History', 'ML-Urdu', 'CL-Arabic', '-'], nextStudies: ['BA Urdu/Arabic', 'Islamic History', 'Linguistics'] },
  { code: '059', name: 'HIS ML-U MUS', subjects: ['History', 'ML-Urdu', 'Music', '-'], nextStudies: ['BA Music', 'Cultural history'] },
  { code: '060', name: 'HIS ML-H CL-SAN', subjects: ['History', 'ML-Urdu', 'CL-Sanskrit', '-'], nextStudies: ['BA Hindi/Sanskrit', 'Education'] },
  { code: '061', name: 'HIS ML-H CL-PER', subjects: ['History', 'ML-Hindi', 'CL-Persian', '-'], nextStudies: ['BA Hindi', 'Persian literature'] },
  { code: '062', name: 'HIS ML-H CL-ARA', subjects: ['History', 'ML-Hindi', 'CL-Arabic', '-'], nextStudies: ['BA Hindi', 'Translation'] },
  { code: '063', name: 'HIS ML-H MUS', subjects: ['History', 'ML-Hindi', 'CL-Arabic', '-'], nextStudies: ['BA Music', 'Teaching', 'Performing arts'] },
  { code: '064', name: 'HIS ML-T CL-SAN', subjects: ['History', 'ML-Tamil', 'CL-Sanskrit', '-'], nextStudies: ['BA Tamil/Sanskrit', 'History'] },
  { code: '065', name: 'HIS ML-T CL-PER', subjects: ['History', 'ML-Tamil', 'CL-Persian', '-'], nextStudies: ['BA Tamil', 'Translation'] },
  { code: '066', name: 'HIS ML-T CL-ARA', subjects: ['History', 'ML-Tamil', 'CL-Arabic', '-'], nextStudies: ['BA Tamil', 'Islamic studies'] },
  { code: '067', name: 'HIS ML-T MUS', subjects: ['History', 'ML-Tamil', 'Music', '-'], nextStudies: ['Carnatic Music', 'BA Tamil', 'Musicology'] },
  { code: '068', name: 'HIS ML-M CL-SAN', subjects: ['History', 'ML-Marathi', 'CL-Sanskrit', '-'], nextStudies: ['BA Marathi', 'Sanskrit'] },
  { code: '069', name: 'HIS ML-M CL-PER', subjects: ['History', 'ML-Marathi', 'CL-Persian', '-'], nextStudies: ['BA Marathi', 'History'] },
  { code: '070', name: 'HIS ML-CL-ARA', subjects: ['History', 'ML-Marathi', 'CL-Arabic', '-'], nextStudies: ['BA Marathi', 'Translation'] },
  { code: '071', name: 'HIS ML-M CL MUS', subjects: ['History', 'ML-Marathi', 'Music', '-'], nextStudies: ['BA Music', 'Teaching'] },
  { code: '072', name: 'HIS ML-K CL-SAN', subjects: ['History', 'ML-Kannada', 'CL-Sanskrit', '-'], nextStudies: ['BA Kannada/Sanskrit', 'History'] },
  { code: '073', name: 'HIS ML-K CL-PER', subjects: ['History', 'ML-Kannada', 'CL-Persian', '-'], nextStudies: ['BA Kannada', 'Translation'] },
  { code: '074', name: 'HIS ML-K CL-ARA', subjects: ['History', 'ML-Kannada', 'CL-Arabic', '-'], nextStudies: ['BA Kannada', 'Linguistics'] },
  { code: '075', name: 'HIS ML-K MUS', subjects: ['History', 'ML-Kannada', 'CL-Music', '-'], nextStudies: ['Carnatic Music', 'BA Kannada'] },
  { code: '076', name: 'HIS ML-O CL-SAN', subjects: ['History', 'ML-Oriya', 'CL-Sanskrit', '-'], nextStudies: ['BA Oriya/Sanskrit', 'Education'] },
  { code: '077', name: 'HIS ML-O CL-PER', subjects: ['History', 'ML-Oriya', 'CL-Persian', '-'], nextStudies: ['BA Oriya', 'History'] },
  { code: '078', name: 'HIS ML-O CL-ARA', subjects: ['History', 'ML-Oriya', 'CL-Arabic', '-'], nextStudies: ['BA Oriya', 'Interpretation'] },
  { code: '079', name: 'HIS ML-O MUS', subjects: ['History', 'ML-Oriya', 'CL-Music', '-'], nextStudies: ['Odissi Music', 'BA Oriya'] },
  { code: '080', name: 'HIS ML-E CL-SAN', subjects: ['History', 'ML-English', 'CL-Sanskrit', '-'], nextStudies: ['BA English/Sanskrit', 'Teaching'] },
  { code: '081', name: 'HIS ML-E CL-PER', subjects: ['History', 'ML-English', 'CL-Persian', '-'], nextStudies: ['BA English', 'Publishing'] },
  { code: '082', name: 'HIS ML-E CL-ARA', subjects: ['History', 'ML-English', 'CL-Arabic', '-'], nextStudies: ['BA English', 'Translation'] },
  { code: '083', name: 'HIS ML-E MUS', subjects: ['History', 'ML-English', 'Music', '-'], nextStudies: ['BA English', 'Fine arts', 'Performing arts'] },
  { code: '084', name: 'CIV SOC PUB', subjects: ['Civics', 'Sociology', 'Public Admn', '-'], nextStudies: ['Sociology', 'Public Administration', 'Social Work'] },
  { code: '085', name: 'PSY ECO HIS', subjects: ['Psychology', 'Economics', 'History', '-'], nextStudies: ['Psychology', 'Counselling', 'Social Work', 'HR', 'BA Economics'] }
];

// All 26 unique polytechnic engineering and non-engineering courses
export const POLYTECHNIC_DIPLOMAS: PolytechnicDiploma[] = [
  { id: 'poly_applied_art', name: 'Applied Art (Commercial Art)', isEngineering: false, lateralBTech: 'Creative fields (BFA, Bachelor of Design); no direct B.Tech lateral path.', description: 'Focuses on visual communication, advertisement, graphic layout, vector illustration, and promotional typography.' },
  { id: 'poly_arch', name: 'Architectural Assistantship', isEngineering: true, lateralBTech: 'Eligible for direct lateral entry into B.Arch (where criteria permit) or civil-related courses.', description: 'Practical drafting, CAD rendering, scale modeling, structural design theory, and building estimation.' },
  { id: 'poly_art_draw', name: 'Art for Drawing Teachers', isEngineering: false, lateralBTech: 'No direct B.Tech lateral path; aligns with fine arts teaching courses.', description: 'Pedagogy of visual drawings, design compositions, oil paints, standard sketches, and curriculum development.' },
  { id: 'poly_automobile', name: 'Automobile Engineering', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Mechanical Engineering (as per AP ECET rules).', description: 'Internal combustion engines, automotive transmissions, braking systems, electric vehicles (EV), and workshop maintenance.' },
  { id: 'poly_cosmetology', name: 'Cosmetology & Health', isEngineering: false, lateralBTech: 'No direct B.Tech lateral path; connects to vocational healthcare or hospitality degrees.', description: 'Dermatological basics, hair structure styling, nutrition science, therapeutic cosmetology, and wellness management.' },
  { id: 'poly_chemical', name: 'Chemical Engineering', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Chemical Engineering or Biotechnology.', description: 'Mass and heat transfer, thermodynamics, fluid flow operations, reaction dynamics, and petrochemical pipeline systems.' },
  { id: 'poly_civil', name: 'Civil Engineering', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Civil Engineering.', description: 'Structural drafting, concrete tech, surveying, soil mechanics, environmental engineering, and site surveillance.' },
  { id: 'poly_civil_const', name: 'Civil Engineering (Construction Engineering)', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Civil Engineering.', description: 'Sub-variant specializing in construction schedules, concrete mixers, contract files, and safety audits.' },
  { id: 'poly_civil_ph', name: 'Civil Engineering (Public Health & Environmental)', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Civil Engineering.', description: 'Specialized focus on water purification setups, drainage layout design, ecological sanitation, and civic planning.' },
  { id: 'poly_computer', name: 'Computer Engineering', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Computer Science & Engineering (and related computing branches).', description: 'Data structures, computer architectures, web programming, relational databases, software design, and system diagnostics.' },
  { id: 'poly_digital_elec', name: 'Digital Electronics', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Electronics & Communication Engineering (ECE).', description: 'Microprocessors, logic circuit systems, operational amplifiers, communication arrays, and digital filter arrays.' },
  { id: 'poly_electrical', name: 'Electrical Engineering', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Electrical and Electronics Engineering (EEE).', description: 'AC/DC machinery, transformer operations, electrical power grid generation, circuit analysis, and plant wiring safety.' },
  { id: 'poly_ece', name: 'Electronics & Communication Engineering', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Electronics & Communication Engineering.', description: 'Signal modulation, integrated circuits, optical fiber routing, microwave engineering, and satellite networks.' },
  { id: 'poly_fashion', name: 'Fashion Design', isEngineering: false, lateralBTech: 'No direct lateral path; qualifies for Bachelor of Design (B.Des) or related creative streams.', description: 'Pattern grading, illustration, history of costumes, textile properties, boutique management, and garment construction.' },
  { id: 'poly_garment', name: 'Garment Fabrication Technology', isEngineering: false, lateralBTech: 'No direct B.Tech lateral path; connects with textile design or industrial tailoring.', description: 'Apparel machinery automation, quality inspection, fabric cutting algorithms, and production layout management.' },
  { id: 'poly_itesm', name: 'Information Technology Enabled Services & Management (ITES&M)', isEngineering: false, lateralBTech: 'No direct B.Tech lateral path (or connects to BCA / B.Sc IT).', description: 'Voice process protocols, customer service automation, desktop layouts, network administration, and corporate desk CRM.' },
  { id: 'poly_ic', name: 'Instrumentation & Control Engineering', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Electronics & Instrumentation Engineering.', description: 'Transducers, automated controls, bio-medical probes, industrial PLCs, and SCADA data measurement systems.' },
  { id: 'poly_interior_design', name: 'Interior Design', isEngineering: false, lateralBTech: 'Creative field; no direct B.Tech lateral path. Leads to B.Des (Interior) or B.Arch with separate entrance.', description: 'Spatial layouts, furniture ergonomics, acoustical boards, light fixture plans, material pricing, and 3D interior renders.' },
  { id: 'poly_library', name: 'Library & Information Science', isEngineering: false, lateralBTech: 'No direct B.Tech lateral path; leads to Bachelor of Library Science (B.Lib.I.Sc).', description: 'Classification systems (Dewey/Colon), digital catalog cards, query retrieval protocols, and archive management.' },
  { id: 'poly_mechanical', name: 'Mechanical Engineering', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Mechanical Engineering and related specialties.', description: 'Thermodynamics, fluid mechanics, industrial CAD/CAM, workshop tooling, power generators, and material kinetics.' },
  { id: 'poly_mechanical_maint', name: 'Mechanical Engineering (Maintenance Engineering)', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Mechanical Engineering.', description: 'Focused on plant predictive failures, lubrication cycles, machine overhaul, vibration metrics, and breakdown protocols.' },
  { id: 'poly_med_elec', name: 'Medical Electronics', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Electronics & Communication Engineering or Bio-Medical Engineering.', description: 'Diagnostic rigs (ECG, EEG, Ultrasound), surgical diathermy protocols, physiological sensor boards, and hospital safety regulations.' },
  { id: 'poly_mlt', name: 'Medical Laboratory Technology', isEngineering: false, lateralBTech: 'Healthcare diploma; no direct B.Tech lateral path. Connects to B.Sc MLT degree streams.', description: 'Pathological culture cells, biochemical testing, hematology lab slides, clinical immunology, and toxicological assays.' },
  { id: 'poly_polymer', name: 'Polymer Technology', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Chemical Engineering or Polymer Science.', description: 'Polyester syntheses, extrusion machinery parameters, compound matrices, rubber vulcanization, and plastic testing.' },
  { id: 'poly_printing', name: 'Printing Technology', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Mechanical Engineering (as per AP ECET rules under Production specialization).', description: 'Flexographic plates, newsprint machinery operation, digital printer metrics, color matching arrays, and post-press layout bindings.' },
  { id: 'poly_production', name: 'Production Engineering', isEngineering: true, lateralBTech: 'Eligible for direct 2nd-year admission into B.Tech in Mechanical Engineering / Production Engineering.', description: 'Metal casting, CNC lathe programming, supply-chain quality metrics, optimization theory, and factory floor layouts.' },
  { id: 'poly_textile_design', name: 'Textile Design', isEngineering: false, lateralBTech: 'Creative design stream; no direct B.Tech lateral path.', description: 'Weaving loom matrices, organic yarn dyeing, block printing, jacquard mechanics, and fashion apparel sketching.' },
  { id: 'poly_tool_die', name: 'Tool & Die Making', isEngineering: false, lateralBTech: 'Qualifies under manufacturing; lateral paths to Mechanical production where colleges specify.', description: 'Precision mold fabrication, jig and fixture layout, micrometers calibration, CNC milling setups, and heavy press dies.' }
];

// ITI & Vocational trades
export const ITI_VOCATIONAL_TRADES: ITIVocationalTrade[] = [
  { name: 'Electrician', type: 'ITI - Engineering', duration: '2 Years', certification: 'NTC (National Trade Certificate)', description: 'Practical domestic, industrial and power-grid wiring. Motors, alternators, transformers and generator wiring setups.', careerPath: 'Junior Lineman, Electrical Maintenance technician, Railway maintenance officer, self-employed contractor.' },
  { name: 'Fitter', type: 'ITI - Engineering', duration: '2 Years', certification: 'NTC (National Trade Certificate)', description: 'Precision machining, metal filing, pipeline fittings, heavy manufacturing assembly, and welding principles.', careerPath: 'CNC Operator, Assembler in automotive factories, Railway Coach mechanic, Defense weapon plant supervisor.' },
  { name: 'Mechanic (Motor Vehicle)', type: 'ITI - Engineering', duration: '2 Years', certification: 'NTC (National Trade Certificate)', description: 'Specialized repair, assembly, and tuning of diesel engines, direct injection pumps, gearboxes, and suspension frames.', careerPath: 'Service Engineer, Depot Mechanic, Road Transport supervisor, Automotive service dealer.' },
  { name: 'COPA (Computer Operator and Programming Assistant)', type: 'ITI - Non-Engineering', duration: '1 Year', certification: 'NTC (National Trade Certificate)', description: 'Operating computing systems, relational databases (SQL), typing speed, sheet templates, basic scripting (HTML/CSS), and networking.', careerPath: 'Office Assistant, Data Entry specialist, Customer Service executive, Junior System support.' },
  { name: 'Refrigeration and Air Conditioning (RAC)', type: 'ITI - Engineering', duration: '2 Years', certification: 'NTC (National Trade Certificate)', description: 'Compressor cycles, refrigerant thermodynamics, centralized duct layouts, air filter units, and home refrigerator cooling grids.', careerPath: 'AC Plant technician, HVAC maintenance officer, Cold storage engineer, Home appliance specialist.' },
  { name: 'DMLT (Medical Laboratory Technology)', type: 'Vocational', duration: '2 Years (Post-10th)', certification: 'Vocational Diploma', description: 'Healthcare training on diagnostic specimen preparation, blood grouping, cellular slide stains, and chemical reagent balances.', careerPath: 'Lab Assistant in diagnostics centers, Clinical pathology reader, blood bank custodian.' },
  { name: 'Hotel Management & Catering', type: 'Vocational', duration: '1 - 2 Years', certification: 'Vocational Certificate / Diploma', description: 'Front office etiquette, food production, bakery tools, culinary safety, and guest service logistics.', careerPath: 'Sous Chef, Cruise liner host, Banquets operations trainee, Restaurant manager.' },
  { name: 'Graphic Designing & Web layouts', type: 'Vocational', duration: '6 Months - 1 Year', certification: 'Vocational Diploma', description: 'Visual styling in Photoshop/Illustrator, UI prototyping, wireframes, basic frontend responsive layouts.', careerPath: 'Junior Graphic Designer, Brand coordinator, Frontend design trainee.' },
  { name: 'Fashion Design & Ornamentation', type: 'Vocational', duration: '1 - 2 Years', certification: 'Vocational Diploma', description: 'Pattern layout templates, embroidery machines, traditional block printing, and local boutique management.', careerPath: 'Boutique Stylist, Costume supervisor, independent designer.' },
  { name: 'Agriculture & Smart Farming', type: 'Vocational', duration: '2 Years', certification: 'Vocational Diploma', description: 'Drip irrigation layouts, soil health metrics, seed breeding genetics, organic composting, and pesticide drone controllers.', careerPath: 'Agricultural field coordinator, smart nursery manager, seed quality manager.' }
];

export const ACADEMIC_PATHWAYS: AcademicPathway[] = [
  // 10th Class Pathways
  {
    id: 'mpc',
    level: '10th',
    category: 'Science',
    name: 'Intermediate MPC (Maths, Physics, Chemistry)',
    duration: '2 Years',
    eligibility: 'Pass 10th Class standard with Science / Maths focus',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Sanskrit/Second Language'],
    estimatedFees: '₹15,000 - ₹65,000 per year',
    description: 'The MPC stream is the premier choice for students aspiring to pursue careers in Engineering, Information Technology, physical sciences, architecture, and advanced analytical fields. It establishes strong mathematical and analytical problem-solving credentials.',
    futureOpportunities: [
      'B.Tech / B.E. (All Engineering disciplines)',
      'B.Sc. in Physics, Chemistry, Maths, or Computer Science',
      'Integrated M.Sc courses',
      'National Defence Academy (NDA) / Armed Forces Services',
      'Bachelor of Architecture (B.Arch)'
    ],
    higherEducationOptions: [
      'JEE Main & Advanced for IITs/NITs',
      'State-level Engineering Common Entrance Tests (EAMCET, MHTCET, etc.)',
      'BITSAT for BITS Pilani',
      'NATA for Architecture'
    ],
    careerOutcomes: [
      'Software Engineer / Architect',
      'Data Scientist',
      'Aerospace Engineer',
      'Construction Manager / Architect',
      'Defense Officer'
    ],
    nodePosition: { x: 25, y: 22 },
    alumniInsights: [
      {
        id: 'alumni_alex',
        name: 'Alex Mercer',
        role: 'Software Architect at JIO',
        avatar: '👨‍💻',
        institution: 'JNTU Kakinada (Direct Lateral Entry via AP ECET)',
        yearCompleted: '2021',
        experience: 'Completed my Diploma in GMR Polytechnic, Kakinada with 9.2 GPA, and cracked ECET Rank 74, which allowed me to enter JNTU Civil/CSE in the second year. It is a fantastic pathway for students who want practical hands-on experience before the B.Tech grind. Skipping 11th and 12th board stresses gave me intense laboratory strength.',
        advice: 'For Polytechnic students trying the AP ECET lateral path, start practicing engineering math and CS fundamentals right from your 3rd semester. Top colleges only take rank holders below 150.',
        rating: 5,
        timeline: [
          { year: '2015', title: 'Started Comp Eng Diploma', description: 'Joined Government Polytechnic, Vijayawada after 10th', type: 'education' },
          { year: '2018', title: 'AP ECET Rank 74', description: 'Topped the district and secured lateral admission into 2nd year B.Tech at JNTU Kakinada', type: 'milestone' },
          { year: '2021', title: 'Graduated B.Tech with Honours', description: 'Acquired core software algorithms knowledge; recruited by Tech Mahindra', type: 'education' },
          { year: '2025', title: 'Switched to JIO Systems', description: 'Architecting distributed database pipelines for LTE streaming', type: 'career' }
        ]
      },
      {
        id: 'alumni_deepika',
        name: 'Dr. Deepika Rao',
        role: 'General Medicine Resident at AMC',
        avatar: '👩‍⚕️',
        institution: 'Andhra Medical College (AMC), Visakhapatnam',
        yearCompleted: '2020',
        experience: 'I chose BiPC because I wanted to be a doctor. I completed my Intermediate at Narayana Nellore. The course material is bulky, botany and zoology cellular structures are intensive. But the thrill of clearing NEET and entering AMC is unmatched. Learning clinical diagnosis on live patients taught me what empathy truly means.',
        advice: 'Practice diagrams daily so they are committed to visual memory. Physics in medical entrance is often ignored by students; cracking the physics section is what gets you the Government medical college seat!',
        rating: 4.8,
        timeline: [
          { year: '2012', title: 'Completed Class 10', description: 'Scored 10.0 GPA and enrolled in BiPC', type: 'education' },
          { year: '2014', title: 'Cleared NEET-UG (Score 618)', description: 'Gained merit quota seat at Andhra Medical College Vet/MBBS', type: 'milestone' },
          { year: '2019', title: 'Finished AMC House Surgeoncy', description: 'One-year clinical rotations across general wards, ICU, and pediatrics', type: 'education' },
          { year: '2023', title: 'Admitted to Post Graduation', description: 'Selected MD General Medicine residency at AMC', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'bipc',
    level: '10th',
    category: 'Science',
    name: 'Intermediate BiPC (Biology, Physics, Chemistry)',
    duration: '2 Years',
    eligibility: 'Finished 10th Standard with Biology/Science focus',
    subjects: ['Botany', 'Zoology', 'Physics', 'Chemistry', 'English', 'Second Language'],
    estimatedFees: '₹20,000 - ₹85,000 per year',
    description: 'BiPC is the gateway path for medical, healthcare, veterinary, agricultural, and biological sciences. This stream opens up highly impactful careers dedicated to human anatomy, pharmaceuticals, research, and ecology.',
    futureOpportunities: [
      'MBBS (Medicine & Surgery) / BDS (Dental Surgery)',
      'B.Pharm (Pharmacy)',
      'B.Sc in Agriculture or Forestry',
      'BPT (Physiotherapy)',
      'B.Sc in Biotechnology / Genetics / Microbiology'
    ],
    higherEducationOptions: [
      'NEET-UG (National Eligibility cum Entrance Test) for medical entry',
      'AIIMS B.Sc nursing / paramedical entrance exams',
      'Agricultural entrance tests (ICAR AIEEA)'
    ],
    careerOutcomes: [
      'Doctor (Physician / Surgeon / Pediatrician)',
      'Clinical Research Scientist',
      'Pharmacist / Drug Inspector',
      'Agricultural Scientist',
      'Veterinary Doctor'
    ],
    nodePosition: { x: 25, y: 38 },
    alumniInsights: [
      {
        id: 'alumni_deepika_bipc',
        name: 'Dr. Deepika Rao',
        role: 'General Medicine Resident at AMC',
        avatar: '🥼',
        institution: 'Andhra Medical College (AMC), Visakhapatnam',
        yearCompleted: '2020',
        experience: 'BiPC requires incredible retention and a love for organic life. Do not underestimate chemistry equations. They are high score markers.',
        advice: 'Never skip cell Biology. Many ignore botany for human systems but cellular processes are heavily asked in NEET. Start biological drawing practice early.',
        rating: 5,
        timeline: [
          { year: '2012', title: 'Entered BiPC Academy', description: 'Chose medical path driven by human physiology', type: 'education' },
          { year: '2014', title: 'Cleared Medical Entrance (NEET/AIPMT)', description: 'Chose MBBS at AMC Delhi', type: 'milestone' },
          { year: '2020', title: 'MBBS Completed', description: 'Served clinical residency with high honours', type: 'education' },
          { year: '2023', title: 'MD Residency', description: 'Resident Specialist handling emergency cardiovascular operations', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'cec',
    level: '10th',
    category: 'Commerce',
    name: 'Intermediate CEC (Civics, Economics, Commerce)',
    duration: '2 Years',
    eligibility: 'Passed 10th Class from any board',
    subjects: ['Commerce', 'Economics', 'Civics', 'Accountancy', 'English', 'Second Language'],
    estimatedFees: '₹12,000 - ₹35,000 per year',
    description: 'CEC is ideal for students who are intrigued by business operations, finance management, taxation, national economics, and local governance. It has a high curriculum overlap with commercial laws, accounting, and public policy.',
    futureOpportunities: [
      'B.Com (General, Computers, or Honours)',
      'Chartered Accountancy (CA Foundation path)',
      'Company Secretary (CS path)',
      'BBA (Bachelor of Business Administration)',
      'Integrated Law (BA LLB / B.Com LLB)'
    ],
    higherEducationOptions: [
      'CA Foundation exam entry directly after 12th',
      'DU ET / CUET (Central Universities Common Entrance Test)',
      'CLAT (Common Law Admission Test) for National Law Universities'
    ],
    careerOutcomes: [
      'Chartered Accountant',
      'Corporate Financial Analyst',
      'Investment Banker',
      'Corporate Legal Counsel',
      'Economic Advisor'
    ],
    nodePosition: { x: 25, y: 55 },
    alumniInsights: [
      {
        id: 'alumni_emily',
        name: 'CA Emily Vance',
        role: 'Audit Manager at Deloitte',
        avatar: '💼',
        institution: 'ICAI Member / CEC at Sri Chaitanya Hyderabad',
        yearCompleted: '2018',
        experience: 'CEC is an exceptional stream. Accountancy is the language of business. Studying double-entry bookkeeping in intermediate gave me the base to clear CA foundation and inter groups smoothly. Doing B.Com simultaneously helped balance academics with corporate auditing requirements during articleship.',
        advice: 'Never treat bookkeeping as memorization. Focus on the core principles of journal entries. If your foundation is clear, clearing IPCC will be extremely logical.',
        rating: 4.9,
        timeline: [
          { year: '2012', title: 'Chose CEC stream', description: 'Left science because of a high interest in banking ledger rules', type: 'education' },
          { year: '2014', title: 'CA CPT Cleared', description: 'Passed Foundation with 172/200 marks, joined B.Com alongside', type: 'milestone' },
          { year: '2018', title: 'Qualified CA Finals', description: 'Passed both groups of finals in first attempt while training at local audit firm', type: 'education' },
          { year: '2021', title: 'Audit Manager at Deloitte', description: 'Directing public listing auditing and statutory financial reports', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'polytechnic',
    level: '10th',
    category: 'Vocational',
    name: 'Polytechnic Engineering Diploma',
    duration: '3 Years',
    eligibility: 'Passed 10th Class (qualifying POLYCET)',
    subjects: ['Applied Physics', 'Engineering Mathematics', 'Branch Specific Labs (Mechanical/Computer/ECE)', 'Industrial Training'],
    estimatedFees: '₹8,000 - ₹35,000 per year',
    description: 'A structural hands-on technical pathway. Students learn real-world engineering skills in workshops rather than dry board exams. A massive advantage is the AP ECET lateral program, allowing direct jump to 2nd year B.Tech.',
    futureOpportunities: [
      'Direct admission to 2nd year B.Tech via Lateral Entry (ECET)',
      'Associate Engineer roles in public sectors (Railway, ISRO, state power grids)',
      'Merchant Navy training entry'
    ],
    higherEducationOptions: [
      'ECET (Engineering Common Entrance Test) for lateral B.Tech entry'
    ],
    careerOutcomes: [
      'Junior Engineer (JE) in State/Central Gov',
      'Production Supervisor',
      'Technical Support Specialist',
      'CAD / CAM Designer'
    ],
    nodePosition: { x: 25, y: 72 },
    alumniInsights: [
      {
        id: 'alumni_sandeep',
        name: 'Sandeep Kumar',
        role: 'Associate Electrical Engineer at AP Transco',
        avatar: '👷',
        institution: 'Govt Polytechnic, Tirupati (AP ECET Topper)',
        yearCompleted: '2019',
        experience: 'Polytechnic is the ultimate shortcut to real engineering. Doing a 3-year diploma in Electrical Engineering taught me how transformers actually operate. In B.Tech, MPC students had good theory, but I topped all machinery lab scores because I had handled real grid boards already in diploma.',
        advice: 'Never ignore lab sessions! The things you draw in sheets and solder in boards will make you stands out in job placements.',
        rating: 5,
        timeline: [
          { year: '2014', title: 'Joined EEE Diploma', description: 'Cleared POLYCET and picked Govt Polytechnic Tirupati', type: 'education' },
          { year: '2017', title: 'Lateral Entry (AP ECET)', description: 'Selected for EEE at SVU College of Engineering Tirupati', type: 'milestone' },
          { year: '2020', title: 'Assistant Engineer Selection', description: 'Cleared state power grid recruitment after rigorous exam', type: 'career' },
          { year: '2024', title: 'Grid Operations Executive', description: 'Directing substation distribution grids in South AP region', type: 'career' }
        ]
      }
    ]
  },

  // 12th Class Pathways
  {
    id: 'btech_cs',
    level: '12th',
    category: 'Engineering',
    name: 'B.Tech Computer Science & Engineering (CSE)',
    duration: '4 Years',
    eligibility: 'Finished 12th with Maths, Physics, Chemistry (MPC) / Diploma lateral',
    subjects: ['Data Structures & Algorithms', 'Operating Systems', 'Database Systems', 'Compiler Design', 'Artificial Intelligence', 'Software Architecture'],
    estimatedFees: '₹40,000 (Govt) - ₹2,00,000 per year',
    description: 'The premier technical undergraduate degree globally. CS Engineering teaches the logical construct, design, optimization, and scaling of software applications, cyber infrastructure, intelligence databases, and neural models.',
    futureOpportunities: [
      'M.S / M.Tech in Specialized AI / Cybersecurity',
      'Direct placement in global product tech giants',
      'Founder / Tech Entrepreneurship',
      'MBA in Systems or Operations'
    ],
    higherEducationOptions: [
      'GATE Examination for IIT/IISc Masters',
      'GRE & TOEFL for global MS options',
      'CAT/GMAT for MBA entry'
    ],
    careerOutcomes: [
      'Full Stack Developer',
      'Machine Learning Engineer',
      'Database Administrator',
      'Cloud Architect',
      'Cybersecurity Analyst'
    ],
    nodePosition: { x: 75, y: 22 },
    alumniInsights: [
      {
        id: 'alumni_alex_cs',
        name: 'Alex Mercer',
        role: 'Software Architect at JIO',
        avatar: '💻',
        institution: 'JNTU Kakinada (Direct Lateral Entry via AP ECET)',
        yearCompleted: '2021',
        experience: 'Entering B.Tech CSE via lateral entry was a massive advantage. While normal 1st-year students studied chemistry, I came directly in 2nd year and started building coding modules.',
        advice: 'Focus heavily on Database Indexes and computer networking. Knowing how data moves is critical in backend scaling.',
        rating: 4.8,
        timeline: [
          { year: '2018', title: 'Joined JNTU CSE', description: 'Cracked AP ECET Rank 74, direct second year admission', type: 'education' },
          { year: '2021', title: 'Placed at Tech Mahindra', description: 'Hired during site coding round', type: 'milestone' },
          { year: '2023', title: 'Lead Script Programmer', description: 'Migrated legacy relational structures to distributed databases', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'medicine_mbbs',
    level: '12th',
    category: 'Medical',
    name: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
    duration: '5.5 Years (including Internship)',
    eligibility: 'Finished 12th with Biology, Physics, Chemistry (BiPC) & Cleared NEET-UG with high percentile',
    subjects: ['Human Anatomy', 'Physiology', 'Biochemistry', 'Pharmacology', 'Pathology', 'General Surgery', 'Pediatrics'],
    estimatedFees: '₹12,00,000 per year',
    description: 'The elite healthcare pathway. Prepares students academically and clinically to care for patients, run surgical suites, diagnose rare clinical trends, and handle public health crises. High dedication and empathetic resilience required.',
    futureOpportunities: [
      'Master of Surgery (MS)',
      'Doctor of Medicine (MD)',
      'Clinical Health Administration (MHA)',
      'Global fellowships & PhD in clinical science'
    ],
    higherEducationOptions: [
      'NEET-PG for specialization MD/MS selection',
      'USMLE (United States Medical Licensing Examination)',
      'PLAB (UK Medical practicing licensure)'
    ],
    careerOutcomes: [
      'Specialist Doctor',
      'Healthcare Consultant',
      'Surgeon',
      'Medical Director / Superintendent',
      'Clinical Trial Lead'
    ],
    nodePosition: { x: 75, y: 38 },
    alumniInsights: [
      {
        id: 'alumni_deepika_mbbs',
        name: 'Dr. Deepika Rao',
        role: 'General Medicine Resident at AMC',
        avatar: '🩺',
        institution: 'Andhra Medical College (AMC), Visakhapatnam',
        yearCompleted: '2020',
        experience: 'The journey from Narayana nellore to Andhra Medical College was tough but highly rewarding. Medical clinical rotations are your best learning grounds.',
        advice: 'Never rush. It takes almost 10 years to become a fully stable specialist of your choice. Love the process, not just the title.',
        rating: 5,
        timeline: [
          { year: '2014', title: 'Joined MBBS AMC', description: 'Finished NEET and selected clinical medicine', type: 'education' },
          { year: '2019', title: 'House Surgeoncy Rotations', description: 'Practicing diagnostics across emergency trauma wards', type: 'milestone' },
          { year: '2023', title: 'Cardiovascular Residency', description: 'Admitted into Doctor of Medicine MD', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'chartered_accountant',
    level: '12th',
    category: 'Specialized',
    name: 'Chartered Accountancy (CA)',
    duration: '4 - 5 Years',
    eligibility: 'Passed 12th in any stream (Commerce preferred with MEC/CEC)',
    subjects: ['Advanced Accounting', 'Corporate Laws', 'Strategic Financial Management', 'Indirect Taxes', 'Direct Taxation', 'Auditing & Assurance'],
    estimatedFees: '₹40,000 - ₹80,000 (total ICAI training and books)',
    description: 'The highest tier accounting qualification in the country. Governed by the ICAI, CA includes multiple rigorous exams (Foundation, Intermediate, Final) and a mandatory 3-year articleship handling live corporate audits and taxation.',
    futureOpportunities: [
      'Setting up an exclusive CA firm',
      'Chief Financial Officer (CFO) pathways',
      'Compliance & Legal Board Directors',
      'Strategic Financial Consulting'
    ],
    higherEducationOptions: [
      'Direct Ph.D. pathways in State Commerce departments',
      'Corporate Finance MBA programs (GMAT)',
      'DISA / ISA Information Systems audit qualification'
    ],
    careerOutcomes: [
      'Auditor & Taxation Advisor',
      'Chief Financial Officer (CFO)',
      'Investment Consultant',
      'Management Consultant',
      'Tax Practitioner'
    ],
    nodePosition: { x: 75, y: 55 },
    alumniInsights: [
      {
        id: 'alumni_emily_ca',
        name: 'CA Emily Vance',
        role: 'Audit Manager at Deloitte',
        avatar: '💼',
        institution: 'ICAI Member / CEC at Sri Chaitanya Hyderabad',
        yearCompleted: '2018',
        experience: 'Articleship is where you actually learn. Do not buy dummy articleships; select a small/mid tier firm where you get direct client meeting access and file different taxes yourself.',
        advice: 'Read local income tax laws daily. Regulations change with the Union budget, and keeping track of these amendments is what makes you an expert.',
        rating: 5,
        timeline: [
          { year: '2014', title: 'Enrolled CA IPCC', description: 'Cleared both groups of intermediate IPCC on first try', type: 'education' },
          { year: '2015', title: 'Began Articleship', description: 'Joined senior firm handling audits for real estate setups', type: 'education' },
          { year: '2018', title: 'Qualified CA Finals', description: 'Officially registered as Chartered Accountant with ICAI', type: 'milestone' },
          { year: '2021', title: 'Joined Deloitte India', description: 'Manager for global financial audits and risk assessment', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'bba_management',
    level: '12th',
    category: 'Commerce',
    name: 'Bachelor of Business Administration (BBA)',
    duration: '3 Years',
    eligibility: 'Completed 12th in any stream (Commerce / Science)',
    subjects: ['Principles of Management', 'Marketing Management', 'Human Resource Management', 'Business Analytics', 'Consumer Behavior', 'Financial Institutions'],
    estimatedFees: '₹30,000 - ₹1,50,050 per year',
    description: 'BBA introduces students to administrative frameworks, marketing philosophies, HR dynamics, market analytics, and organization coordination. Highly action-oriented and suited for future leaders and startup builders.',
    futureOpportunities: [
      'Corporate Management Trainee program',
      'Sales and Marketing Lead',
      'Retail Operations Manager',
      'Product Management pathways'
    ],
    higherEducationOptions: [
      'CAT / GMAT / XAT / SNAP for top business schools (IIM, ISB, etc.)',
      'MS in Management globally'
    ],
    careerOutcomes: [
      'Marketing Manager',
      'HR Specialist',
      'Operations Associate',
      'Business Consultant',
      'Brand Strategist'
    ],
    nodePosition: { x: 75, y: 68 },
    alumniInsights: [
      {
        id: 'alumni_p_saikiran',
        name: 'P. Sai Kiran',
        role: 'Operations Consultant at GMR Group',
        avatar: '🤵',
        institution: 'Andhra University Commerce School',
        yearCompleted: '2020',
        experience: 'I did CEC in intermediate and BBA from AU, Visakhapatnam. BBA is extremely functional! I was heavily active in local management fests which helped me build intense communication and presentation skills.',
        advice: 'Acquire internships right from your second year. Classroom notes won\'t teach you how actual logistics or consumer sales works.',
        rating: 4.7,
        timeline: [
          { year: '2017', title: 'Enrolled in BBA at AU', description: 'Discovered interest in consumer traffic and logistics', type: 'education' },
          { year: '2019', title: 'L&T Operations Intern', description: 'Completed internship tracking project equipment logistics', type: 'milestone' },
          { year: '2020', title: 'Graduated BBA', description: 'Graduated top of my class with marketing honours', type: 'education' },
          { year: '2024', title: 'Logistics Supervisor at GMR', description: 'Overseeing passenger scheduling and fleet systems at Vizag airport', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'btech_mechanical',
    level: '12th',
    category: 'Engineering',
    name: 'B.Tech Mechanical Engineering (ME)',
    duration: '4 Years',
    eligibility: 'Completed 12th with MPC (Maths, Physics, Chemistry)',
    subjects: ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'CAD/CAM', 'Robotics and Automation', 'Material Science'],
    estimatedFees: '₹35,000 - ₹1,80,000 per year',
    description: 'The core discipline of engineering. ME teaches mechanical forces, fluid dynamics, energy conversion systems, automatic robotic controllers, thermodynamic calculators, and machine designing.',
    futureOpportunities: [
      'Public Sector Undertakings (PSU) via GATE recruitment',
      'Automotive R&D Systems',
      'Aerospace propulsion research',
      'Robotics & Industrial Automation developer'
    ],
    higherEducationOptions: [
      'GATE Exam for M.Tech admissions at IISc/IITs',
      'MS in Automotive / Mechanics in Germany'
    ],
    careerOutcomes: [
      'Design Engineer',
      'Plant Systems Manager',
      'Robotics Automation Planner',
      'HVAC Systems Engineer'
    ],
    nodePosition: { x: 80, y: 15 },
    alumniInsights: [
      {
        id: 'alumni_rahul_mech',
        name: 'Rahul Verma',
        role: 'Maintenance Lead at Tata Motors',
        avatar: '🚗',
        institution: 'SVU College of Engineering, Tirupati',
        yearCompleted: '2021',
        experience: 'In SVUCE Mech, handling heavy engines in labs gave me extreme confidence. Modern manufacturing uses fully automated plants.',
        advice: 'Learn SolidWorks, AutoCAD, and FEA early. Knowing simulation is incredibly helpful in design tasks.',
        rating: 4.6,
        timeline: [
          { year: '2017', title: 'Started ME Program', description: 'Enrolled with state board scholarship', type: 'education' },
          { year: '2021', title: 'Joined Tata Motors', description: 'Selected during manual coding/systems onsite round', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'btech_ece',
    level: '12th',
    category: 'Engineering',
    name: 'B.Tech Electronics & Communication Engineering (ECE)',
    duration: '4 Years',
    eligibility: 'Completed 12th with MPC (Maths, Physics, Chemistry)',
    subjects: ['Analog Networks', 'Microcontrollers & IoT', 'Digital Signal Processing', 'VLSI Design', 'Electromagnetics & Waves', 'Embedded OS firmware'],
    estimatedFees: '₹40,000 - ₹2,10,000 per year',
    description: 'ECE connects raw semiconductor hardware to software systems. Encompasses microprocessor design, radio frequency signal propagation, automated IoT sensor networks, and advanced VLSI silicon chips.',
    futureOpportunities: [
      'VLSI Chip design and manufacturing sector',
      'Embedded Software & Device Driver programing',
      'Telecom Wave infrastructure engineering'
    ],
    higherEducationOptions: [
      'M.Tech in VLSI System Design at Indian Institutes',
      'MS in Telecommunications / Signal Processing globally'
    ],
    careerOutcomes: [
      'Silicon Layout Engineer',
      'Embedded Firmware Developer',
      'Telecom Signals Officer',
      'Hardware Systems Architect'
    ],
    nodePosition: { x: 80, y: 30 },
    alumniInsights: [
      {
        id: 'alumni_vikram_ece',
        name: 'Vikram AD',
        role: 'Hardware Engineer at Intel Corporation',
        avatar: '📟',
        institution: 'JNTU College of Engineering, Hyderabad',
        yearCompleted: '2020',
        experience: 'ECE sets up extremely strong math and logic foundations. Understanding how digital signals process in a transistor is pure magic.',
        advice: 'Do not just sit for software jobs; the chip design industry is growing exponentially and has massive pay scales.',
        rating: 4.9,
        timeline: [
          { year: '2016', title: 'Secured JNTUH Seat', description: 'Passed state exam with outstanding rank', type: 'education' },
          { year: '2020', title: 'Intel VLSI Hire', description: 'Joined chip physical design validation team', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'medicine_bds',
    level: '12th',
    category: 'Medical',
    name: 'Bachelor of Dental Surgery (BDS)',
    duration: '5 Years (including Internship)',
    eligibility: 'Finished 12th with BiPC & qualified NEET-UG with good score',
    subjects: ['Oral Histology & Pathology', 'Dental Material Sciences', 'Prosthodontics', 'Oral & Maxillofacial Surgery', 'Orthodontic Alignments', 'Pedodontia'],
    estimatedFees: '₹45,000 - ₹4,80,000 per year',
    description: 'The standard pathways for certified dental doctors. Focuses on oral cavity health, periodontal operations, facial bone alignments, dental crowns, root canals, and orthodontic devices.',
    futureOpportunities: [
      'Master of Dental Surgery (MDS) specialisation',
      'Establishing Independent Private Dental Clinics',
      'Public dental health officer designations'
    ],
    higherEducationOptions: [
      'NEET-MDS Specialization Exam',
      'Cosmetic Dentistry and Implantology Fellowscopes'
    ],
    careerOutcomes: [
      'Professional Dentist',
      'Maxillofacial Surgeon Specialist',
      'Dental Clinic Director',
      'Public Dental Researcher'
    ],
    nodePosition: { x: 85, y: 45 },
    alumniInsights: [
      {
        id: 'alumni_rashmi_dent',
        name: 'Dr. Rashmi Naidu',
        role: 'Consultant Orthodontist',
        avatar: '🩺',
        institution: 'NTR University of Health Sciences, Vijayawada',
        yearCompleted: '2019',
        experience: 'Dental surgery is a perfect blend of manual precision and medical diagnostics. Seeing patients regain their smile is extremely rewarding.',
        advice: 'Hone your manual dexterity early. Good tooth crafting needs artist-level finger control.',
        rating: 4.5,
        timeline: [
          { year: '2014', title: 'Joined BDS', description: 'Admitted following NEET-UG healthcare list', type: 'education' },
          { year: '2019', title: 'Started Sparkle Hub', description: 'Opened a dedicated cosmetic family dental clinic', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'b_pharmacy',
    level: '12th',
    category: 'Medical',
    name: 'Bachelor of Pharmacy (B.Pharm)',
    duration: '4 Years',
    eligibility: 'Passed 12th with BiPC or MPC subjects',
    subjects: ['Pharmaceutics & Dose Systems', 'Medicinal Chemistry', 'Pharmacology & Therapeutics', 'Pharmacognosy (Herbal drugs)', 'Pharmaceutical analysis'],
    estimatedFees: '₹30,500 - ₹1,20,000 per year',
    description: 'Studies chemical compounds, medicine formulas, clinical dosage levels, biological testing, and legal pharmaceutical laws. Prepares pharmacists to research, formulate, test, or distribute public drug lines.',
    futureOpportunities: [
      'Master of Pharmacy (M.Pharm) R&D specialization',
      'Drug Safety Officer in Govt boards',
      'Industrial Formulation Planning manager'
    ],
    higherEducationOptions: [
      'GPAT Entrance for NIPER Masters',
      'MBA in Pharmaceutical Management systems'
    ],
    careerOutcomes: [
      'Clinical Drug Scientist',
      'Assistant Drug Inspector',
      'Quality Control Analyst',
      'Clinical Trials Supervisor'
    ],
    nodePosition: { x: 80, y: 50 },
    alumniInsights: [
      {
        id: 'alumni_liam_pharm',
        name: 'Liam Baker',
        role: 'Drug Quality Auditor at Dr. Reddys Labs',
        avatar: '💊',
        institution: 'GITAM Institute of Pharmacy, Visakhapatnam',
        yearCompleted: '2021',
        experience: 'Pharmacy is a high-stakes clinical area. Auditing cleanroom production batches leaves zero margin of deviation.',
        advice: 'GPAT rank is your ticket to supreme central research stipends. Dedicate yourself to pharmacology chemistry.',
        rating: 4.7,
        timeline: [
          { year: '2017', title: 'Admitted B.Pharm', description: 'Began academic and laboratory drug science program', type: 'education' },
          { year: '2021', title: 'Joined Quality Audits', description: 'Assigned as Cleanroom Chemical Batch Validator', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'bsc_agriculture',
    level: '12th',
    category: 'Medical',
    name: 'B.Sc Honours in Agriculture',
    duration: '4 Years',
    eligibility: 'Finished 12th with Science (BiPC / MPC)',
    subjects: ['Agronomy & Soil Chemistry', 'Crop Genetics & Breeding', 'Plant Pathology & Entomology', 'Agricultural Economics', 'Horticulture & Forestry', 'Extension Education'],
    estimatedFees: '₹15,000 - ₹80,000 per year',
    description: 'An expansive science program covering crop genetics, field soil chemical balances, food economics, eco-friendly pest control, and smart farming equipment. Combines laboratory research with extensive field work.',
    futureOpportunities: [
      'Agricultural Officer (AO) Recruitment Exams',
      'NABARD and commercial Bank Field officers',
      'M.Sc. research in Agronomy or Genetics'
    ],
    higherEducationOptions: [
      'ICAR AIEEA Entrance for premier university Masters',
      'MBA in Agri-Business Management'
    ],
    careerOutcomes: [
      'Agricultural Extension Officer',
      'Seed Development Expert',
      'Soil Quality Analyst',
      'Agri-Business Planner'
    ],
    nodePosition: { x: 70, y: 45 },
    alumniInsights: [
      {
        id: 'alumni_anji_agri',
        name: 'Anjaneyulu M.',
        role: 'Agricultural Development Officer',
        avatar: '🌾',
        institution: 'ANGRAU Guntur Academic Campus',
        yearCompleted: '2020',
        experience: 'Agriculture science blends biochemistry with field economics. Solving local farmers crop infectivity is a deeply rewarding duty.',
        advice: 'Never study soil chemistry passively. Work directly with agricultural farm blocks on campus.',
        rating: 4.8,
        timeline: [
          { year: '2016', title: 'Enrolled in ANGRAU', description: 'Entered following high rank in Agri-admission codes', type: 'education' },
          { year: '2020', title: 'State Officer selection', description: 'Selected by government department after competitive civil assessment', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'bca_applications',
    level: '12th',
    category: 'Commerce',
    name: 'Bachelor of Computer Applications (BCA)',
    duration: '3 Years',
    eligibility: 'Finished 12th with any stream (Maths not compulsory in many institutes)',
    subjects: ['Web Designing', 'Java Programming', 'Database Operations', 'Python Scripting', 'Software Engineering Core', 'Digital Web Commerce'],
    estimatedFees: '₹25,000 - ₹1,10,000 per year',
    description: 'A 3-year professional bridge into software development. Covers programming languages, relational databases, web scripting, and IT systems administration. Highly functional and faster to complete than B.Tech.',
    futureOpportunities: [
      'Master of Computer Applications (MCA) for full engineering equivalency',
      'Direct developer hiring in mid/top tier services IT firms',
      'IT Database Support operations analyst'
    ],
    higherEducationOptions: [
      'NIMCET Exam for top NIT MCA admissions',
      'MS in Information Systems or Computing globally'
    ],
    careerOutcomes: [
      'Frontend / UI Web Developer',
      'Database Operations Associate',
      'Computer Network Administrator',
      'Software Testing Engineer'
    ],
    nodePosition: { x: 80, y: 70 },
    alumniInsights: [
      {
        id: 'alumni_ramesh_bca',
        name: 'Ramesh Reddy',
        role: 'Web Operations Developer at Tech Mahindra',
        avatar: '💻',
        institution: 'Sri Venkateswara University, Tirupati',
        yearCompleted: '2021',
        experience: 'BCA focuses cleanly on practical programming. We built full web systems and compiled SQL scripts.',
        advice: 'Keep testing real API endpoints on GitHub. Self-built apps secure interviews faster than grade cards.',
        rating: 4.6,
        timeline: [
          { year: '2018', title: 'Admitted BCA', description: 'Began computing and networks syllabus at SVU computer labs', type: 'education' },
          { year: '2021', title: 'IT Systems Induction', description: 'Acquired tech developer seat following database design round', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'integrated_law',
    level: '12th',
    category: 'Specialized',
    name: 'Integrated BA LLB / BBA LLB (Law)',
    duration: '5 Years',
    eligibility: 'Finished 12th in any stream & Cleared CLAT/LSAT exam',
    subjects: ['Constitutional Law', 'Criminal Jurisprudence', 'Corporate Mergers & Acquisitions', 'Intellectual Property Rights', 'Family Law & Mediation', 'Moot Court Practice'],
    estimatedFees: '₹35,000 (Govt) - ₹2,50,050 per year',
    description: 'A double graduation program blending social sciences/business with comprehensive legal studies. Trains candidates in judiciary drafts, consumer litigation, constitutional interpretations, and corporate board representation.',
    futureOpportunities: [
      'Corporate Law Associate in global advisory firms',
      'State Judicial Services recruitment (Magistrate)',
      'Independent Litigator or Public Advocate'
    ],
    higherEducationOptions: [
      'Master of Laws (LLM) at premier judicial academic centers',
      'Civil Services and IPS training routes'
    ],
    careerOutcomes: [
      'Corporate Legal Advisor',
      'State Magistrate / Judge Officer',
      'Litigation Advocate',
      'IP & Copyright Specialist'
    ],
    nodePosition: { x: 60, y: 60 },
    alumniInsights: [
      {
        id: 'alumni_divya_law',
        name: 'Divya Sree',
        role: 'Corporate Counsel at ICICI Bank',
        avatar: '⚖',
        institution: 'NALSAR University of Law, Hyderabad',
        yearCompleted: '2019',
        experience: 'Integrated law is rigorous. Participating in national mock trial moot competitions teaches you how to present legal clauses confidently under pressure.',
        advice: 'Read company audit sheets and contract files. High-paying law roles are in corporate compliance, which requires solid financial intelligence.',
        rating: 4.9,
        timeline: [
          { year: '2014', title: 'Joined NALSAR Hyderabad', description: 'Secured rank in national CLAT exam list', type: 'education' },
          { year: '2017', title: 'National Moot court Winner', description: 'Topped IP law mock arguments in Delhi Supreme Court', type: 'milestone' }
        ]
      }
    ]
  },
  {
    id: 'nda_defence',
    level: '12th',
    category: 'Specialized',
    name: 'National Defence Academy (NDA)',
    duration: '3 Years Academic + 1 Year Specialization',
    eligibility: 'Unmarried Male/Female candidates completed 12th (MPC required for Navy/AirForce)',
    subjects: ['Military Strategy & History', 'Ballistics & Weapon Mechanics', 'Naval Systems navigation', 'Aerospace mechanics', 'Leadership Ethics & Physical Drills'],
    estimatedFees: 'Fully sponsored by Govt of India (with stipend)',
    description: 'The elite training pipeline for officers in the Indian Army, Navy, and Air Force. Emphasizes strict leadership, strategic ballistics, defense politics, survival skills, and physical coordination.',
    futureOpportunities: [
      'Officer designation in Army, Navy, or Air Force',
      'Special Operations commands',
      'Military strategic attaches'
    ],
    higherEducationOptions: [
      'Joint defence staff college programs',
      'Strategic warfare specialized diplomas'
    ],
    careerOutcomes: [
      'Lieutenant / Flying Officer / Sub-Lieutenant',
      'Strategic Planning Officer',
      'Defense intelligence Analyst'
    ],
    nodePosition: { x: 55, y: 45 },
    alumniInsights: [
      {
        id: 'alumni_capt_harsh',
        name: 'Major Harsh Wardhan',
        role: 'Regiment Officer, Indian Army',
        avatar: '🪖',
        institution: 'National Defence Academy, Khadakwasla',
        yearCompleted: '2015',
        experience: 'NDA is not just an education; it is a rewriting of your character. Waking at 4:30 AM for tactical field drills teaches physical and mental resilience.',
        advice: 'Build strong general knowledge and a razor-sharp physical stance. Group discussion tasks assess active team coordination, not just loudness.',
        rating: 5,
        timeline: [
          { year: '2011', title: 'Cracked NDA Exam', description: 'Passed written UPSC exam & intensive SSB interview boards', type: 'education' },
          { year: '2015', title: 'Commissioned Officer', description: 'Graduated from IMA Dehradun as Lieutenant', type: 'milestone' }
        ]
      }
    ]
  },
  {
    id: 'b_design',
    level: '12th',
    category: 'Specialized',
    name: 'Bachelor of Design (B.Des)',
    duration: '4 Years',
    eligibility: 'Passed 12th in any stream & Cleared UCEED / NID entrance',
    subjects: ['Visual Communication', 'User Experience (UX) Architecture', 'Fashion Illustration & Textiles', 'Industrial Product Modelling', '3D UI prototyping', 'Design Theory'],
    estimatedFees: '₹50,000 - ₹2,50,000 per year',
    description: 'Prepares creative students for product packaging, mobile app layouts, visual marketing campaigns, fashion clothing lines, and physical vehicle ergonomics. Focuses heavily on user empathy, composition, and layout.',
    futureOpportunities: [
      'UX Designer in top tech teams',
      'Fashion Brand consultant',
      'Industrial packaging strategist'
    ],
    higherEducationOptions: [
      'M.Des (Master of Design)',
      'Human-Computer Interaction MS'
    ],
    careerOutcomes: [
      'UI/UX Architect',
      'Lead Fashion Designer',
      'Automotive Ergonomics Planner',
      'Creative Director'
    ],
    nodePosition: { x: 55, y: 70 },
    alumniInsights: [
      {
        id: 'alumni_ananya_des',
        name: 'Ananya S.',
        role: 'Product UX Designer at Swiggy',
        avatar: '🎨',
        institution: 'NID Ahmedabad Graduate',
        yearCompleted: '2021',
        experience: 'UX design is about building smooth digital micro-interactions. My B.Des taught me how to study user paint-points and translate them into simple layouts.',
        advice: 'Create a beautiful online portfolio of your designs. Tech companies care about your live Figma flows, not paper certificates.',
        rating: 4.8,
        timeline: [
          { year: '2017', title: 'Joined NID', description: 'Passed national design evaluation testing rounds', type: 'education' },
          { year: '2021', title: 'Swiggy UX Internship', description: 'Created new checkout panel interfaces, hired full-time', type: 'milestone' }
        ]
      }
    ]
  },
  {
    id: 'bfa_fine_arts',
    level: '12th',
    category: 'Specialized',
    name: 'Bachelor of Fine Arts (BFA)',
    duration: '4 Years',
    eligibility: 'Passed 12th in any stream & cleared university drawing portfolio round',
    subjects: ['Classical Painting & Composition', 'Creative Sculpting & Moulding', 'Graphic arts & Printmaking', 'Visual History & Aesthetics', 'Digital Illustration', 'Exhibition Curating'],
    estimatedFees: '₹10,500 - ₹50,000 per year',
    description: 'An immersive fine-arts experience. Highlights classical oil compositions, heavy-metal sculpting, manual screen printing, modern graphic communication, and digital vector illustration. Teaches the conceptualization of deep visual stories.',
    futureOpportunities: [
      'Fine Arts Studio Curator',
      'Digital Comic and Concept Artist',
      'Video Game Asset Illustrator'
    ],
    higherEducationOptions: [
      'MFA (Master of Fine Arts)',
      'Art Curation Fellowships'
    ],
    careerOutcomes: [
      'Concept Illustrator',
      'Classical Painter',
      'Art Curator',
      'Digital Storyboard Artist'
    ],
    nodePosition: { x: 50, y: 80 },
    alumniInsights: [
      {
        id: 'alumni_subhash_art',
        name: 'Subhash Chandra',
        role: 'Senior Character Illustrator at Ubisoft',
        avatar: '🎨',
        institution: 'JNA&FAU Hyderabad Fine Arts School',
        yearCompleted: '2018',
        experience: 'My BFA taught me composition, shadow weights, and perspective. Translating classic canvas brush-strokes into gaming engine characters was my main breakthrough.',
        advice: 'Learn digital design brushes and 3D modeling programs alongside traditional oil paints. The industry is digital.',
        rating: 4.5,
        timeline: [
          { year: '2014', title: 'Joined Fine Arts College', description: 'Submitted custom layout concepts for admission', type: 'education' },
          { year: '2018', title: 'Ubisoft Asset Designer', description: 'Designing characters for major graphic console titles', type: 'career' }
        ]
      }
    ]
  },
  {
    id: 'b_com_hons',
    level: '12th',
    category: 'Commerce',
    name: 'Bachelor of Commerce (B.Com Hons)',
    duration: '3 Years',
    eligibility: 'Completed 12th with Commerce/Science (MEC/CEC/MPC)',
    subjects: ['Corporate Accounting & Audit', 'Business Mathematics', 'Micro & Macro Economics', 'Corporate Laws', 'Banking & Insurance', 'Financial Portfolio Analysis'],
    estimatedFees: '₹15,000 - ₹85,000 per year',
    description: 'The standard commercial qualification. Covers ledger balancing, banking rules, market supply-demand economics, stock market portfolio structures, and commercial laws. Suitable for students aiming for finance operations.',
    futureOpportunities: [
      'M.Com graduation',
      'Corporate Financial Analysts',
      'Government Bank recruitment'
    ],
    higherEducationOptions: [
      'CAT for Business School MBA',
      'ICAI Chartered Accountancy (CA) direct entry'
    ],
    careerOutcomes: [
      'Credit Analyst',
      'Investment Portfolio Associate',
      'Internal Corporate Auditor',
      'Commercial Officer'
    ],
    nodePosition: { x: 75, y: 75 },
    alumniInsights: [
      {
        id: 'alumni_nikhil_com',
        name: 'Nikhil G.',
        role: 'Investment Analyst at Goldman Sachs',
        avatar: '📊',
        institution: 'Loyola College, Chennai',
        yearCompleted: '2021',
        experience: 'B.Com Honours teaches you how capital moves in an enterprise. Learning to read real financial balance sheets is an essential capability for banking jobs.',
        advice: 'Learn Excel modeling formulas and SQL databases. Basic book accounting is all automated now.',
        rating: 4.7,
        timeline: [
          { year: '2018', title: 'Began B.Com', description: 'Enrolled in financial accounting track', type: 'education' },
          { year: '2021', title: 'Acquired Banking Role', description: 'Secured analyst role during investment bank case study rounds', type: 'milestone' }
        ]
      }
    ]
  },
  {
    id: 'merchant_navy',
    level: '12th',
    category: 'Specialized',
    name: 'B.Sc Nautical Science (Merchant Navy)',
    duration: '3 Years Academic + 1 Year Sea Internship',
    eligibility: 'Passed 12th MPC with minimum 60% and cleared IMU-CET exam & strict eye/medical standards',
    subjects: ['Ship Navigation & Chartwork', 'Marine Zoology & Oceanography', 'Ship cargo stability', 'Navigational electronics (radar, GPS)', 'Maritime Law & Sea Safety'],
    estimatedFees: '₹1,50,000 - ₹3,50,000 per year',
    description: 'A physically adventurous pathways. Nautical science teaches ocean coordinates, heavy cargo balancing, marine radio logs, international sea border rules, and ship operations management across global travel maps.',
    futureOpportunities: [
      'Deck cadet designations',
      'Ocean cargo operations planner',
      'Port scheduler'
    ],
    higherEducationOptions: [
      'Captain Certification exams globally',
      'Marine Administration MBA'
    ],
    careerOutcomes: [
      'Deck Officer (third mate)',
      'Marine Cargo Supervisor',
      'Harbour Pilot / Coordinator',
      'Ship Superintendent'
    ],
    nodePosition: { x: 70, y: 30 },
    alumniInsights: [
      {
        id: 'alumni_capt_vinay',
        name: 'Capt. Vinay Kumar',
        role: 'Chief Deck Officer, Maersk Line',
        avatar: '🚢',
        institution: 'Indian Maritime University, Chennai',
        yearCompleted: '2014',
        experience: 'The sea is an intense workspace. Living on deep ocean tankers for 6-months straight teaches unmatched mental self-reliance and weather coordination.',
        advice: 'Never compromise on maritime physical standards or radar training. The safety of a $100M ship relies on your night-watch calculations.',
        rating: 5,
        timeline: [
          { year: '2010', title: 'Enrolled in IMU', description: 'Cleared IMU-CET and qualified medical checks', type: 'education' },
          { year: '2014', title: 'First Sea Voyage', description: 'Deck Cadet on container logistics lines crossing Atlantic ocean', type: 'milestone' }
        ]
      }
    ]
  },
  {
    id: 'bsc_nursing',
    level: '12th',
    category: 'Medical',
    name: 'B.Sc Nursing',
    duration: '4 Years',
    eligibility: 'Completed 12th with BiPC (Biology, Physics, Chemistry)',
    subjects: ['Anatomy & Physiology', 'Nutrition & Dietetics', 'Medical-Surgical Nursing', 'Community Health Nursing', 'Child Health & Pediatrics', 'Obstetrical Nursing'],
    estimatedFees: '₹20,500 - ₹1,10,000 per year',
    description: 'Prepares professional nurses to deliver hospital ward care, assist surgical suites, monitor ICU patient recovery, run emergency trauma logistics, and participate in global public health programs.',
    futureOpportunities: [
      'M.Sc Nursing Specialization',
      'Global hospital networks (UK/US licensure)',
      'Nursing Superintendent'
    ],
    higherEducationOptions: [
      'M.Sc Nursing programs',
      'Global NCLEX-RN exam for USA clinical practice'
    ],
    careerOutcomes: [
      'Clinical Nurse Specialist',
      'Critical Care Practitioner',
      'Nurse Tutor/Educator',
      'Health Advisor'
    ],
    nodePosition: { x: 65, y: 50 },
    alumniInsights: [
      {
        id: 'alumni_mary_nurse',
        name: 'Nurse Mary Joseph',
        role: 'ICU Charge Nurse at Apollo Hospitals',
        avatar: '👩‍⚕️',
        institution: 'St. John\'s College of Nursing, Bangalore',
        yearCompleted: '2018',
        experience: 'ICU ward care demands instant clinical judgement. Setting up ventilators, checking dosage lines, and coordinating status directly with lead surgeons is high responsibility.',
        advice: 'Develop strong clinical empathy. Caring for a patient is as much about psychological comfort as it is about chemical drug charts.',
        rating: 4.8,
        timeline: [
          { year: '2014', title: 'Joined B.Sc Nursing', description: 'Began clinical rotations across medical, surgical wards', type: 'education' },
          { year: '2018', title: 'Apollo ICU Hire', description: 'Inducted as junior emergency ward clinician', type: 'career' }
        ]
      }
    ]
  }
];

export const GENERAL_STATISTICS = {
  activeStudents: '14,200+',
  verifiedAlumni: '12 MENTORS',
  academicJourneys: '110+ GROUPS',
  mentorshipMessages: '24,500+',
  satisfactionRate: '99.1%'
};
