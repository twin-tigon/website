export type Project = {
  name: string;
  description: string;
  url: string;
  keywords: string[];
};

export type ContactInfo = {
  name: string;
  value: string;
};

export type Content = {
  name: string;
  description: string;
  projects: Project[];
  contactInfo: ContactInfo[];
};
