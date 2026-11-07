/** CV data. Edit here and the home + experience pages update together. */

export const summary =
  "Technology professional delivering AI, machine learning, and cloud data engineering solutions for enterprise clients, with end-to-end ownership of the ML and software lifecycle, from requirements and architecture through deployment and stakeholder communication.";

export const technologies = [
  "Python", "SQL", "Dify", "RAG", "AWS", "Apache Airflow", "PostgreSQL",
  "Snowflake", "Apache Spark", "PyTorch", "TensorFlow", "Scikit-learn",
  "OpenCV", "MediaPipe", "Flask", "JavaScript", "HTML/CSS", "Pandas",
  "NumPy", "Grafana", "Datadog", "DBeaver", "Jira", "Git",
];

export const highlights = [
  { value: "3.82", label: "GPA", detail: "B.Eng Computer Engineering, Undip" },
  { value: "5,000+", label: "Reviews classified", detail: "Sentiment analysis platform" },
  { value: "92%", label: "Accuracy", detail: "Real-time driver monitoring" },
  { value: "500+", label: "Hours of ML training", detail: "Bangkit Academy" },
];

export type Job = {
  org: string;
  shortOrg: string;
  place: string;
  role: string;
  shortRole: string;
  period: string;
  /** One-liner used on the home page. */
  summary: string;
  points: string[];
  current?: boolean;
};

export const jobs: Job[] = [
  {
    org: "Deloitte Indonesia",
    shortOrg: "Deloitte Indonesia",
    place: "Jakarta, Indonesia",
    role: "Analyst – Technology & Transformation (AI & Data)",
    shortRole: "Analyst, AI & Data",
    period: "Sep 2025 – Present",
    current: true,
    summary:
      "LLM workflows on Dify, AWS + Airflow data pipelines, and client-facing delivery for a leading telecom client.",
    points: [
      "Deliver AI and data analytics engagements for a leading Indonesian telecommunications client, designing and implementing LLM-powered workflows on Dify to automate enterprise knowledge retrieval, support operations, and decision-making.",
      "Architect cloud-based data and AI pipelines on AWS, orchestrating workflows with Apache Airflow and integrating PostgreSQL data sources (via DBeaver) with Python ETL and analytics layers on EdgeNode compute environments.",
      "Develop Python-based data processing, model evaluation, and automation scripts, scheduled and monitored through Airflow DAGs, reducing manual analyst effort across recurring client workstreams.",
      "Lead client-facing requirements-gathering sessions, manage scope and deliverables, and present findings and AI-driven recommendations to technical and non-technical stakeholders.",
      "Coordinate cross-functional Deloitte T&T delivery teams on timelines, code quality, and enterprise data governance, security, and scalability standards.",
    ],
  },
  {
    org: "Freelance",
    shortOrg: "Freelance",
    place: "Remote",
    role: "Machine Learning Engineer",
    shortRole: "Machine Learning Engineer",
    period: "Jun 2025 – Sep 2025",
    summary:
      "End-to-end sentiment analysis platform with scraping, NLP, and a Flask REST API.",
    points: [
      "Designed and shipped a full-stack sentiment analysis platform classifying 5,000+ Traveloka and Agoda reviews using SVM and Gaussian Naive Bayes, with TF-IDF and Sastrawi-based Indonesian NLP preprocessing.",
      "Engineered custom web scraping pipelines to automate dataset collection, cleaning, and labeling, including tokenization, stopword removal, and class balancing.",
      "Architected a modular system separating scraping, preprocessing, inference, and UI layers for rapid model integration and MLOps-friendly deployment.",
      "Deployed a Flask REST API (/predict, /health) with a responsive HTML/Bootstrap frontend featuring authentication, file upload, and persistent result tracking.",
    ],
  },
  {
    org: "Bangkit Academy (Google, GoTo, Tokopedia, Traveloka)",
    shortOrg: "Bangkit Academy",
    place: "Jakarta",
    role: "Machine Learning Intern",
    shortRole: "Machine Learning Intern",
    period: "Feb 2024 – Jul 2024",
    summary: "Led a 5-person team to an 89%-accuracy food recommendation system.",
    points: [
      "Led a 5-person engineering team to deliver a capstone food recommendation system with 89% prediction accuracy using Scikit-learn, feature engineering, and content-based filtering.",
      "Completed 500+ hours of advanced ML training across TensorFlow, data analytics, and IT automation tracks.",
      "Drove the full ML lifecycle in an Agile environment and presented the final product to a panel of senior industry reviewers.",
    ],
  },
  {
    org: "PT Telkom Indonesia (Persero) Tbk",
    shortOrg: "Telkom Indonesia",
    place: "Jakarta, Indonesia",
    role: "Cloud Architecture Intern",
    shortRole: "Cloud Architecture Intern",
    period: "Jul 2023 – Aug 2023",
    summary: "Bare Metal vs. VM cloud architecture benchmarking.",
    points: [
      "Conducted a comparative analysis of Bare Metal vs. Virtual Machine cloud architectures, evaluating performance, cost efficiency, and scalability.",
      "Authored a benchmarking report distributed to 10+ senior engineers, influencing infrastructure adoption decisions.",
    ],
  },
];

export const education = {
  school: "Universitas Diponegoro",
  place: "Semarang, Indonesia",
  degree: "Bachelor of Computer Engineering",
  gpa: "3.82 / 4.00",
  period: "Aug 2021 – Aug 2025",
};

export const organization = {
  name: "Himpunan Mahasiswa Teknik Komputer, Universitas Diponegoro",
  role: "Treasurer, Division of Interests, Talents, and Hobbies",
  period: "Jun 2023 – Jun 2024",
  points: [
    "Managed the divisional budget end-to-end with transparent financial records across all student events.",
    "Planned and executed skill-development workshops and community events with committee members.",
  ],
};

export const certifications = [
  "DeepLearning.AI TensorFlow Developer Professional Certificate",
  "Machine Learning Specialization (Coursera & DeepLearning.AI)",
  "Google Data Analytics Professional Certificate",
  "Mathematics for Machine Learning and Data Science Specialization",
  "Google IT Automation with Python Professional Certificate",
];

export const languages = "Indonesian (Native), English (Professional)";

export const skills: Record<string, string[]> = {
  "Programming & Software Engineering": [
    "Python", "SQL", "JavaScript", "HTML", "CSS", "OOP", "REST APIs", "SDLC", "Unit Testing", "Code Review",
  ],
  "Machine Learning & Data Science": [
    "Scikit-learn", "PyTorch", "TensorFlow", "Keras", "Pandas", "NumPy", "Matplotlib", "Seaborn", "SVM", "Naive Bayes", "Recommendation Systems", "Feature Engineering", "Model Evaluation", "Hyperparameter Tuning", "A/B Testing",
  ],
  "AI, LLM & NLP": [
    "Dify", "LLM Workflow Design", "RAG", "Prompt Engineering", "Vector Embeddings", "TF-IDF", "Tokenization", "Sastrawi", "Sentiment Analysis", "Text Classification",
  ],
  "Computer Vision": [
    "OpenCV", "MediaPipe", "CNN", "Real-time Inference", "Image Processing", "Object & Landmark Detection",
  ],
  "Cloud, MLOps & Observability": [
    "AWS (S3, EC2, SageMaker, EMR, ECR)", "Apache Airflow", "EdgeNode", "Grafana", "Splunk", "Datadog", "CI/CD", "Model Deployment", "Production Monitoring",
  ],
  "Databases & Data Engineering": [
    "PostgreSQL", "Snowflake", "Apache Hive", "Apache Spark", "Beeline", "DBeaver", "ETL/ELT", "Data Modeling", "Web Scraping", "Data Validation", "Query Optimization",
  ],
  "Tools & Delivery": [
    "Git", "GitHub", "Jupyter", "Google Colab", "VS Code", "Flask", "Postman", "Jira", "Confluence", "Agile", "Scrum", "Kanban", "Stakeholder Management", "Requirements Gathering",
  ],
};
