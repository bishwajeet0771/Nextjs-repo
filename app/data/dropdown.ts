const baseUrl = process.env.NEXT_PUBLIC_PROJECT_URL;
// Replace with your actual base URL

const data = [
  {
    label: "My Profile",
    url: `${baseUrl}/your-profile/personal-info`,
    svg: "user-profile",
  },
  {
    label: "Dashboard",
    url: `${baseUrl}/your-profile/dashboard`,
    svg: "dashboard",
  },
  {
    label: "Post Project",
    url: `${baseUrl}/post-your-project`,
    svg: "post-project",
  },
  {
    label: "Post Listing",
    url: `${baseUrl}/post-your-listing`,
    svg: "post-listing",
  },
  {
    label: "Shortlist",
    url: `${baseUrl}/your-profile/shortlisted`,
    svg: "shortlist",
  },
  {
    label: "Compare",
    url: `${baseUrl}/your-profile/compare`,
    svg: "compare",
  },
  {
    label: "Q&A",
    url: `${baseUrl}/your-profile/question-and-answers`,
    svg: "qna",
  },
];
export const unAuthorizedData = [
  {
    label: "Login",
    url: `${process.env.NEXT_PUBLIC_PROJECT_URL}/login`,
  },
  {
    label: "Sign Up",
    url: `${process.env.NEXT_PUBLIC_PROJECT_URL}/register`,
  },
];

export default data;
