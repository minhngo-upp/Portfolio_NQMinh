import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Content Constants - Hardcoded from source documents
const CONTENT = {
  hero: {
    name: "NGÔ QUANG MINH",
    title: "Product Owner",
    summary: "Building AI-powered digital products end-to-end"
  },
  experience: [
    {
      id: 1,
      title: "The Meal Mobile App",
      metric: "10,000+ organic users",
      description: "AI-powered nutrition tracking with real-time sync",
      icon: "🍽️"
    },
    {
      id: 2,
      title: "Patient Management Software",
      metric: "15-20 min/case saved",
      description: "Automated patient data aggregation for clinics",
      icon: "🏥"
    },
    {
      id: 3,
      title: "Healthcare Analytics Dashboard",
      metric: "40% efficiency gain",
      description: "Real-time insights for medical decision making",
      icon: "📊"
    }
  ],
  skills: [
    "Roadmap Planning",
    "Stakeholder Management",
    "Agile/Scrum",
    "User Research",
    "Data Analysis",
    "API Design",
    "Team Leadership",
    "Product Strategy"
  ],
  theMealClinic: {
    problem: "Bác sĩ mất 15–20 phút/ca chỉ để tổng hợp thủ công dữ liệu bệnh nhân",
    outcomes: [
      { id: "G1", label: "Time saved", value: "15-20 min/case" },
      { id: "G2", label: "Data accuracy", value: "99.5%" },
      { id: "G3", label: "Patient satisfaction", value: "+35%" },
      { id: "G4", label: "Doctor efficiency", value: "+50%" }
    ]
  },
  erd: {
    tables: [
      {
        id: "patient_profiles",
        name: "patient_profiles",
        columns: [
          { name: "id", type: "UUID", primary: true },
          { name: "full_name", type: "VARCHAR(255)" },
          { name: "date_of_birth", type: "DATE" },
          { name: "medical_history", type: "JSONB" },
          { name: "created_at", type: "TIMESTAMP" }
        ],
        businessRule: "BR-DB-003: Profile must be verified before sync"
      },
      {
        id: "meal_logs",
        name: "meal_logs",
        columns: [
          { name: "id", type: "UUID", primary: true },
          { name: "patient_id", type: "UUID", foreign: "patient_profiles.id" },
          { name: "food_items", type: "JSONB" },
          { name: "total_calories", type: "INTEGER" },
          { name: "logged_at", type: "TIMESTAMP" }
        ],
        businessRule: "BR-DB-002: Auto-calculate calories on insert"
      },
      {
        id: "payment_transactions",
        name: "payment_transactions",
        columns: [
          { name: "id", type: "UUID", primary: true },
          { name: "patient_id", type: "UUID", foreign: "patient_profiles.id" },
          { name: "amount", type: "DECIMAL(10,2)" },
          { name: "status", type: "VARCHAR(50)" },
          { name: "processed_at", type: "TIMESTAMP" }
        ],
        businessRule: "BR-DB-001: Chỉ sync khi status=success"
      },
      {
        id: "subscription_packages",
        name: "subscription_packages",
        columns: [
          { name: "id", type: "UUID", primary: true },
          { name: "name", type: "VARCHAR(100)" },
          { name: "price", type: "DECIMAL(10,2)" },
          { name: "duration_days", type: "INTEGER" },
          { name: "features", type: "JSONB" }
        ],
        businessRule: "BR-DB-004: Package changes require audit log"
      }
    ]
  },
  frs: {
    folders: [
      {
        id: "A",
        name: "Authentication & Authorization",
        requirements: [
          { id: "FR-A-001", text: "User login with email/password", srsId: "SRS FR-001" },
          { id: "FR-A-002", text: "JWT token refresh mechanism", srsId: "SRS FR-002" },
          { id: "FR-A-003", text: "Role-based access control (RBAC)", srsId: "SRS FR-003" }
        ]
      },
      {
        id: "B",
        name: "Patient Management",
        requirements: [
          { id: "FR-B-001", text: "Create patient profile", srsId: "SRS FR-010" },
          { id: "FR-B-002", text: "Update medical history", srsId: "SRS FR-011" },
          { id: "FR-B-003", text: "View patient dashboard", srsId: "SRS FR-012" }
        ]
      },
      {
        id: "C",
        name: "Meal Tracking",
        requirements: [
          { id: "FR-C-001", text: "Log daily meals", srsId: "SRS FR-020" },
          { id: "FR-C-002", text: "Calculate nutritional values", srsId: "SRS FR-021" },
          { id: "FR-C-003", text: "Generate meal reports", srsId: "SRS FR-022" }
        ]
      },
      {
        id: "D",
        name: "Payment Processing",
        requirements: [
          { id: "FR-D-001", text: "Process payment transactions", srsId: "SRS FR-030" },
          { id: "FR-D-002", text: "Handle subscription renewals", srsId: "SRS FR-031" },
          { id: "FR-D-003", text: "Generate invoices", srsId: "SRS FR-032" }
        ]
      },
      {
        id: "E",
        name: "Content Management",
        requirements: [
          { id: "FR-E-001", text: "Manage food database", srsId: "SRS FR-040" },
          { id: "FR-E-002", text: "Create meal templates", srsId: "SRS FR-041" },
          { id: "FR-E-003", text: "Upload menu files", srsId: "SRS FR-042" },
          { id: "FR-E-004", text: "Upload file thực đơn", srsId: "SRS FR-043" }
        ]
      },
      {
        id: "F",
        name: "Analytics & Reporting",
        requirements: [
          { id: "FR-F-001", text: "Generate health analytics", srsId: "SRS FR-050" },
          { id: "FR-F-002", text: "Export patient reports", srsId: "SRS FR-051" },
          { id: "FR-F-003", text: "Track KPI dashboards", srsId: "SRS FR-052" }
        ]
      },
      {
        id: "G",
        name: "System Administration",
        requirements: [
          { id: "FR-G-001", text: "Manage user permissions", srsId: "SRS FR-060" },
          { id: "FR-G-002", text: "Audit log viewing", srsId: "SRS FR-061" },
          { id: "FR-G-003", text: "System configuration", srsId: "SRS FR-062" }
        ]
      }
    ]
  },
  nfr: {
    items: [
      { id: "NFR-001", text: "Sync Job ≤ 5s", category: "Performance" },
      { id: "NFR-002", text: "99.9% Uptime", category: "Reliability" },
      { id: "NFR-003", text: "GDPR Compliant", category: "Security" },
      { id: "NFR-004", text: "< 100ms API Response", category: "Performance" },
      { id: "NFR-005", text: "JWT Auth", category: "Security" }
    ]
  }
};

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsHovered(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.classList.contains('interactive') ||
        target.closest('.interactive') !== null
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
      style={{ left: position.x, top: position.y }}
    />
  );
};

// Grid Overlay Background
const GridOverlay = () => (
  <div className="grid-overlay" />
);

// Heartbeat Line SVG
const HeartbeatLine = () => (
  <svg className="heartbeat-line" viewBox="0 0 200 60">
    <motion.path
      d="M0 30 L20 30 L30 10 L40 50 L50 30 L200 30"
      fill="none"
      stroke="#10B981"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

// Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 0.3]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, -200]);

  return (
    <section className="section hero-section">
      <motion.div 
        className="hero-content"
        style={{ scale, opacity, y }}
      >
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {CONTENT.hero.name}
        </motion.h1>
        <motion.h2 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {CONTENT.hero.title}
        </motion.h2>
        <motion.p 
          className="hero-summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {CONTENT.hero.summary}
        </motion.p>
      </motion.div>
      <HeartbeatLine />
    </section>
  );
};

// Experience Scroll Section
const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section className="section" ref={containerRef}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        Experience & Impact
      </h2>
      <motion.div 
        className="experience-scroll"
        style={{ x }}
      >
        {CONTENT.experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="experience-card interactive"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{exp.icon}</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{exp.title}</h3>
            <p className="metric-reveal" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              {exp.metric}
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// Skills Grid Section
const SkillsSection = () => (
  <section className="section">
    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
      Core Competencies
    </h2>
    <div className="skills-grid">
      {CONTENT.skills.map((skill, index) => (
        <motion.div
          key={skill}
          className="skill-item interactive"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          {skill}
        </motion.div>
      ))}
    </div>
  </section>
);

// Sync Pipeline SVG Animation
const SyncPipeline = () => {
  return (
    <svg className="sync-pipeline" viewBox="0 0 800 300">
      {/* Phone Icon */}
      <g transform="translate(100, 100)">
        <rect x="0" y="0" width="80" height="120" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
        <rect x="10" y="10" width="60" height="100" fill="#F3F4F6"/>
        <text x="40" y="140" textAnchor="middle" fontSize="12" fill="#6B7280">Mobile App</text>
      </g>

      {/* Web Dashboard Icon */}
      <g transform="translate(600, 80)">
        <rect x="0" y="0" width="120" height="140" rx="5" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
        <rect x="10" y="10" width="100" height="20" fill="#10B981"/>
        <rect x="10" y="40" width="45" height="40" fill="#F3F4F6"/>
        <rect x="65" y="40" width="45" height="40" fill="#F3F4F6"/>
        <rect x="10" y="90" width="100" height="40" fill="#F3F4F6"/>
        <text x="60" y="160" textAnchor="middle" fontSize="12" fill="#6B7280">Web Dashboard</text>
      </g>

      {/* Connection Line */}
      <line x1="180" y1="160" x2="600" y2="160" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5"/>

      {/* Animated Data Packet */}
      <motion.circle
        r="10"
        fill="#10B981"
        initial={{ cx: 180 }}
        animate={{ cx: 600 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* NFR Labels */}
      <text x="390" y="130" textAnchor="middle" className="blinking-data monospace">
        NFR-001: Sync ≤ 5s
      </text>
      <text x="390" y="200" textAnchor="middle" className="blinking-data monospace">
        NFR-005: JWT Auth
      </text>

      {/* Flow Label */}
      <text x="390" y="90" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1F2937">
        Flow 1: Patient mua gói → Sync to Dashboard
      </text>
    </svg>
  );
};

// The Catalyst Section (Problem Statement)
const CatalystSection = () => {
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('catalyst');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          // Counter animation logic removed for simplicity
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="catalyst" className="section project-world">
      <div className="scanner-line" />
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>The Catalyst</h2>
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px',
            border: '1px solid var(--data-grid-grey)',
            marginBottom: '3rem'
          }}
        >
          <p style={{ fontSize: '1.5rem', lineHeight: 1.6 }}>
            {CONTENT.theMealClinic.problem}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {CONTENT.theMealClinic.outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.id}
              className="interactive"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid var(--data-grid-grey)'
              }}
            >
              <p className="monospace" style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                {outcome.id}
              </p>
              <p className="metric-reveal">{outcome.value}</p>
              <p style={{ marginTop: '0.5rem' }}>{outcome.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// The Engine Section (Sync Pipeline)
const EngineSection = () => (
  <section className="section">
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        The Engine
      </h2>
      <SyncPipeline />
      <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {CONTENT.nfr.items.map((nfr, index) => (
          <motion.div
            key={nfr.id}
            className="interactive"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid var(--data-grid-grey)',
              position: 'relative'
            }}
          >
            <span className="blinking-data monospace" style={{ fontSize: '0.875rem' }}>
              {nfr.id}
            </span>
            <p style={{ marginTop: '0.5rem', fontWeight: 600 }}>{nfr.text}</p>
            <p className="monospace" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              {nfr.category}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ERD Node Component
const ERDNode = ({ table }: { table: typeof CONTENT.erd.tables[0] }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      className={`erd-node interactive ${isActive ? 'active' : ''}`}
      onClick={() => setIsActive(!isActive)}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="monospace" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
        {table.name}
      </h3>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ fontSize: '0.875rem' }}>
              {table.columns.map((col) => (
                <div key={col.name} style={{ padding: '0.25rem 0', borderBottom: '1px solid var(--data-grid-grey)' }}>
                  <span className="monospace" style={{ fontWeight: 600 }}>{col.name}</span>
                  <span className="monospace" style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                    {col.type}
                  </span>
                  {col.primary && <span style={{ color: '#10B981', marginLeft: '0.5rem' }}>PK</span>}
                  {col.foreign && <span style={{ color: '#3B82F6', marginLeft: '0.5rem' }}>FK</span>}
                </div>
              ))}
            </div>
            <div className="tooltip" style={{ position: 'relative', marginTop: '1rem', opacity: 1 }}>
              <p className="monospace" style={{ fontSize: '0.75rem', color: '#10B981' }}>
                {table.businessRule}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isActive && (
        <div className="tooltip">Click to reveal schema</div>
      )}
    </motion.div>
  );
};

// The Blueprint Section (ERD)
const BlueprintSection = () => (
  <section className="section" style={{ background: '#F9FAFB' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        The Blueprint
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        Click on any table to reveal its structure
      </p>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2rem',
        position: 'relative'
      }}>
        {CONTENT.erd.tables.map((table) => (
          <ERDNode key={table.id} table={table} />
        ))}
      </div>
    </div>
  </section>
);

// System Folder Component
const SystemFolder = ({ folder }: { folder: typeof CONTENT.frs.folders[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`system-folder interactive ${isExpanded ? 'expanded' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.25rem' }}>
          <span style={{ color: 'var(--neon-health-green)', marginRight: '0.5rem' }}>📁</span>
          Module {folder.id}: {folder.name}
        </h3>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginTop: '1rem' }}
          >
            {folder.requirements.map((req) => (
              <div 
                key={req.id} 
                className="requirement-item"
                style={{ position: 'relative' }}
              >
                <p className="monospace" style={{ fontSize: '0.75rem', color: 'var(--neon-health-green)', marginBottom: '0.25rem' }}>
                  {req.id}
                </p>
                <p>{req.text}</p>
                <div className="tooltip">
                  Maps to {req.srsId}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// The Modules Section (FRS)
const ModulesSection = () => (
  <section className="section">
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        The Modules
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        Click on folders to expand functional requirements
      </p>
      <div className="folder-grid">
        {CONTENT.frs.folders.map((folder) => (
          <SystemFolder key={folder.id} folder={folder} />
        ))}
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer style={{ 
    background: '#1F2937', 
    color: 'white', 
    padding: '3rem 2rem', 
    textAlign: 'center' 
  }}>
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Ngô Quang Minh</h3>
      <p style={{ color: '#9CA3AF', marginBottom: '2rem' }}>Product Owner | Building AI-powered digital products</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <a href="#" className="interactive" style={{ color: '#10B981', textDecoration: 'none' }}>LinkedIn</a>
        <a href="#" className="interactive" style={{ color: '#10B981', textDecoration: 'none' }}>GitHub</a>
        <a href="#" className="interactive" style={{ color: '#10B981', textDecoration: 'none' }}>Email</a>
      </div>
      <p className="monospace" style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '2rem' }}>
        © 2026 | Built with React + Framer Motion + GSAP
      </p>
    </div>
  </footer>
);

// Main App Component
function App() {
  return (
    <>
      <CustomCursor />
      <GridOverlay />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <CatalystSection />
        <EngineSection />
        <BlueprintSection />
        <ModulesSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
