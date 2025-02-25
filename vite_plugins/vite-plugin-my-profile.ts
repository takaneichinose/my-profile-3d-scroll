const TITLE = 'Takane Ichinose | Profile Home Page';
const DESCRIPTION =
  "Personal home page of Takane Ichinose. My skills are written here. I'm web developer by profession, but game developer by hobby.";
const URL = 'https://takaneichinose.github.io';

/**
 * Vite plugin for my profile
 */
export function myProfile() {
  return {
    name: 'my-profile',
    transformIndexHtml(html: string) {
      return html
        .replace(/{% TITLE %}/g, TITLE)
        .replace(/{% DESCRIPTION %}/g, DESCRIPTION)
        .replace(/{% URL %}/g, URL);
    },
  };
}
