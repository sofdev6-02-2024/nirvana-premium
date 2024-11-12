export interface Company {
  name: string;
  location: string;
  description: string;
  profilePictureUrl?: string;
  isVerified: boolean;
  isActive: boolean;
  userId: string;
}

export interface StepFields {
  personal: ["firstName", "lastName"];
  skills: ["skills", "specialty", "yearsOfExperience", "spokenLanguages"];
  preferences: ["modality", "expectedSalary", "portfolioUrl"];
}

// Type for the step IDs
export type StepId = keyof StepFields;

// Update the steps array type
export interface Step {
  id: StepId;
  name: string;
}
