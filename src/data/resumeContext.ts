export const resumeData = {
  basics: {
    name: "Koustubha Pathy",
    email: "koustubhapathyofficial@gmail.com",
    phone: "8260727393",
    linkedin: "https://www.linkedin.com/in/koustubha-pathy/",
    location: "Berhampur, Odisha",
    education: {
      degree: "B.Tech in Computer Science",
      university: "NIST University, Berhampur",
      period: "2024 - 2028",
      cgpa: "8.3"
    }
  },
  experience: [
    {
      role: "IoT and Mechatronics Intern",
      company: "NIST University",
      period: "2025 - Present",
      description: "Gained hands-on experience working with Arduino UNO and Arduino IDE. Developed an ECG-Integrated Smart Health Console using Arduino UNO R4, ECG sensor, and OLED display.",
      skills: ["Arduino", "IoT", "Embedded Systems", "3D Printing"]
    },
    {
      role: "Linux Enthusiast",
      company: "Self-driven",
      period: "Ongoing",
      description: "Hands-on learning in Linux command-line operations, file system navigation, user management, and permissions. Shell scripting and system administration.",
      skills: ["Linux", "Bash", "System Administration"]
    },
    {
      role: "Network Analysis",
      company: "Self-driven",
      period: "Ongoing",
      description: "Experience using Wireshark for network packet analysis, traffic monitoring, and protocol inspection (TCP/UDP/HTTP).",
      skills: ["Wireshark", "Networking", "Packet Analysis"]
    }
  ],
  projects: [
    {
      name: "Campus Navigation System",
      tech: "Python",
      description: "Graph-based path-finding algorithms to guide students across campus. Shortest path calculation."
    },
    {
      name: "Smart Attendance Management System",
      tech: "Java, MySQL",
      description: "Automated attendance tracking system with reporting features. Used OOP principles and Java Collections."
    }
  ],
  skills: [
    "Linux", "Networking", "Wireshark", "Data Structures & Algorithms",
    "Java", "Python", "C", "Web Development"
  ],
  certifications: [
    "Networking Basics (Cisco)",
    "Introduction to Cybersecurity (Cisco)"
  ]
};


export const suggestedQuestions = [
  "Start a conversation",
  "What are your core skills?",
  "Tell me about your projects",
  "Why should we hire you?",
  "How can I contact you?",
  "Do you know Next.js?"
];

export const getAIResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();

  // Greetings
  if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("start")) {
    return "Greetings! I am Koustubha's automated neural link. I can provide detailed information about his technical capabilities, project history, and professional background. How may I assist you today?";
  }

  // Identity
  if (lowerInput.includes("who are you") || lowerInput.includes("what is this")) {
    return "I am an advanced AI construct designed to assist recruiters and visitors in navigating Koustubha's portfolio. I have direct access to his professional data banks.";
  }

  // Contact / Hire
  if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("reach") || lowerInput.includes("hire")) {
    return `You can establish a direct communication link via email at ${resumeData.basics.email} or connect on LinkedIn at ${resumeData.basics.linkedin}. He is open to discussing new opportunities.`;
  }

  // Skills / Tech Stack
  if (lowerInput.includes("skill") || lowerInput.includes("stack") || lowerInput.includes("technology") || lowerInput.includes("know")) {
    return `Koustubha's technical arsenal includes ${resumeData.skills.join(", ")}. He has specialized expertise in Linux systems, Network Analysis, and Low-level programming.`;
  }

  // Experience / Work
  if (lowerInput.includes("experience") || lowerInput.includes("work") || lowerInput.includes("job")) {
    return "Currently, he operates as an IoT and Mechatronics Intern at NIST University, developing embedded health systems. His experience also covers significant self-driven research in Linux administration and Network Security.";
  }

  // Projects
  if (lowerInput.includes("project")) {
    const projectNames = resumeData.projects.map(p => p.name).join(", ");
    return `He has deployed several key initiatives, including: ${projectNames}. Would you like specific details on the "Campus Navigation System" or "Smart Attendance Management System"?`;
  }

  // Specific Project Details
  if (lowerInput.includes("campus") || lowerInput.includes("navigation")) {
    return "The Campus Navigation System is a Python-based utility utilizing graph algorithms to calculate optimal paths across the university campus. It demonstrates strong algorithmic problem-solving skills.";
  }

  if (lowerInput.includes("attendance")) {
    return "The Smart Attendance Management System is a Java/MySQL application designed to automate tracking and reporting. It showcases his grasp of Object-Oriented Programming and database integration.";
  }

  // Education
  if (lowerInput.includes("education") || lowerInput.includes("college") || lowerInput.includes("degree")) {
    return `He is pursuing a B.Tech in Computer Science at NIST University (2024-2028), maintaining a strong academic record with a CGPA of ${resumeData.basics.education.cgpa}.`;
  }

  // "Why hire you?"
  if (lowerInput.includes("why") && (lowerInput.includes("hire") || lowerInput.includes("you"))) {
    return "Koustubha combines theoretical computer science knowledge with practical, hands-on expertise in hardware (IoT) and system-level software (Linux/Networking). He is a proactive learner who builds real-world solutions, making him a versatile asset to any engineering team.";
  }

  return "My internal database doesn't have a specific entry for that. However, I can provide information on his Skills, Experience, Projects, or Contact details. Please refine your query.";
};
