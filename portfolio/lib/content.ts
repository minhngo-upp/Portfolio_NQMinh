export const HERO_CONTENT = {
  name: "NGO QUANG MINH",
  title: "Product Owner",
  summary: "Building AI-powered digital products end-to-end"
};

export const EXPERIENCE_CARDS = [
  {
    id: 1,
    title: "The Meal Mobile App",
    metric: "10,000 organic users",
    description: "AI-powered nutrition tracking and meal planning application",
    color: "#10B981"
  },
  {
    id: 2,
    title: "Patient Management Software",
    metric: "Healthcare Efficiency +40%",
    description: "Streamlined patient data management for clinics",
    color: "#059669"
  },
  {
    id: 3,
    title: "Digital Health Platform",
    metric: "50+ Healthcare Providers",
    description: "End-to-end telemedicine solution",
    color: "#047857"
  }
];

export const SKILLS_GRID = [
  { category: "Product Strategy", items: ["Roadmap Planning", "Stakeholder Management", "Market Research", "Competitive Analysis"] },
  { category: "Technical", items: ["API Design", "Database Architecture", "System Integration", "Agile/Scrum"] },
  { category: "Data & Analytics", items: ["User Analytics", "A/B Testing", "KPI Definition", "Data Visualization"] },
  { category: "Leadership", items: ["Team Management", "Cross-functional Collaboration", "Vision Communication", "Risk Management"] }
];

// PRD v3.2.3 Content - The Catalyst
export const PRD_CONTENT = {
  problemStatement: "Bác sĩ mất 15–20 phút/ca chỉ để tổng hợp thủ công dữ liệu bệnh nhân",
  expectedOutcomes: [
    { id: "G1", label: "Time saved", value: "15-20 min/case", unit: "" },
    { id: "G2", label: "Data accuracy", value: "95", unit: "%" },
    { id: "G3", label: "Patient satisfaction", value: "4.5", unit: "/5" },
    { id: "G4", label: "Adoption rate", value: "80", unit: "%" }
  ],
  targetUsers: ["Doctors", "Nutritionists", "Patients", "Clinic Administrators"]
};

// SRS v3.2.3 Content - The Engine
export const SRS_CONTENT = {
  flows: [
    {
      id: "flow-1",
      name: "Patient mua gói",
      steps: [
        "Patient selects subscription plan",
        "Payment gateway processes transaction",
        "System creates payment_transactions record",
        "Patient profile updated with active subscription",
        "Access granted to premium features"
      ]
    }
  ],
  nfrs: [
    { id: "NFR-001", label: "Sync Job Latency", value: "≤ 5s", description: "Data sync must complete within 5 seconds" },
    { id: "NFR-002", label: "API Response Time", value: "< 200ms", description: "95th percentile response time" },
    { id: "NFR-003", label: "Uptime SLA", value: "99.9%", description: "Monthly availability target" },
    { id: "NFR-004", label: "Concurrent Users", value: "1000+", description: "Simultaneous active sessions" },
    { id: "NFR-005", label: "Authentication", value: "JWT Auth", description: "JSON Web Token based authentication" }
  ]
};

// ERD v3.2.3 Content - The Blueprint
export const ERD_CONTENT = {
  tables: [
    {
      name: "patient_profiles",
      columns: [
        { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
        { name: "full_name", type: "VARCHAR(255)", constraints: "NOT NULL" },
        { name: "date_of_birth", type: "DATE", constraints: "" },
        { name: "medical_history", type: "JSONB", constraints: "" },
        { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" }
      ],
      businessRules: ["BR-DB-001: Chỉ sync khi status=success"]
    },
    {
      name: "meal_logs",
      columns: [
        { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
        { name: "patient_id", type: "UUID", constraints: "FOREIGN KEY REFERENCES patient_profiles(id)" },
        { name: "food_items", type: "JSONB", constraints: "NOT NULL" },
        { name: "total_calories", type: "INTEGER", constraints: "" },
        { name: "logged_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" }
      ],
      businessRules: ["BR-DB-002: Calories auto-calculated from food_items"]
    },
    {
      name: "payment_transactions",
      columns: [
        { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
        { name: "patient_id", type: "UUID", constraints: "FOREIGN KEY REFERENCES patient_profiles(id)" },
        { name: "amount", type: "DECIMAL(10,2)", constraints: "NOT NULL" },
        { name: "status", type: "VARCHAR(50)", constraints: "DEFAULT 'pending'" },
        { name: "transaction_date", type: "TIMESTAMP", constraints: "DEFAULT NOW()" }
      ],
      businessRules: ["BR-DB-001: Chỉ sync khi status=success"]
    },
    {
      name: "subscription_plans",
      columns: [
        { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
        { name: "plan_name", type: "VARCHAR(100)", constraints: "NOT NULL" },
        { name: "price", type: "DECIMAL(10,2)", constraints: "" },
        { name: "features", type: "JSONB", constraints: "" },
        { name: "duration_days", type: "INTEGER", constraints: "" }
      ],
      businessRules: []
    },
    {
      name: "doctor_notes",
      columns: [
        { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
        { name: "patient_id", type: "UUID", constraints: "FOREIGN KEY REFERENCES patient_profiles(id)" },
        { name: "doctor_id", type: "UUID", constraints: "FOREIGN KEY REFERENCES doctors(id)" },
        { name: "content", type: "TEXT", constraints: "" },
        { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" }
      ],
      businessRules: []
    }
  ]
};

// FRS v3.2.3 Content - The Modules
export const FRS_CONTENT = {
  modules: [
    {
      id: "A",
      name: "Patient Management",
      requirements: [
        { id: "FR-A-001", description: "Create new patient profile", srsRef: "SRS FR-001" },
        { id: "FR-A-002", description: "Update patient medical history", srsRef: "SRS FR-002" },
        { id: "FR-A-003", description: "View patient timeline", srsRef: "SRS FR-003" }
      ]
    },
    {
      id: "B",
      name: "Meal Tracking",
      requirements: [
        { id: "FR-B-001", description: "Log daily meals", srsRef: "SRS FR-010" },
        { id: "FR-B-002", description: "Calculate nutritional values", srsRef: "SRS FR-011" },
        { id: "FR-B-003", description: "Generate meal reports", srsRef: "SRS FR-012" }
      ]
    },
    {
      id: "C",
      name: "Subscription & Payment",
      requirements: [
        { id: "FR-C-001", description: "Select subscription plan", srsRef: "SRS FR-020" },
        { id: "FR-C-002", description: "Process payment transaction", srsRef: "SRS FR-021" },
        { id: "FR-C-003", description: "Manage subscription renewal", srsRef: "SRS FR-022" }
      ]
    },
    {
      id: "D",
      name: "Doctor Dashboard",
      requirements: [
        { id: "FR-D-001", description: "View patient list", srsRef: "SRS FR-030" },
        { id: "FR-D-002", description: "Add clinical notes", srsRef: "SRS FR-031" },
        { id: "FR-D-003", description: "Generate health insights", srsRef: "SRS FR-032" }
      ]
    },
    {
      id: "E",
      name: "File Management",
      requirements: [
        { id: "FR-E-001", description: "Upload medical documents", srsRef: "SRS FR-040" },
        { id: "FR-E-002", description: "Store lab results", srsRef: "SRS FR-041" },
        { id: "FR-E-003", description: "Manage document versions", srsRef: "SRS FR-042" },
        { id: "FR-E-004", description: "Upload file thực đơn", srsRef: "SRS FR-043" }
      ]
    },
    {
      id: "F",
      name: "Analytics & Reporting",
      requirements: [
        { id: "FR-F-001", description: "Generate patient progress reports", srsRef: "SRS FR-050" },
        { id: "FR-F-002", description: "Export data to CSV/PDF", srsRef: "SRS FR-051" },
        { id: "FR-F-003", description: "Visualize health trends", srsRef: "SRS FR-052" }
      ]
    },
    {
      id: "G",
      name: "System Administration",
      requirements: [
        { id: "FR-G-001", description: "Manage user roles", srsRef: "SRS FR-060" },
        { id: "FR-G-002", description: "Configure system settings", srsRef: "SRS FR-061" },
        { id: "FR-G-003", description: "Audit log access", srsRef: "SRS FR-062" }
      ]
    }
  ]
};
