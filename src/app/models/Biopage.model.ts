export interface ThemeConfig {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
}

export type BioBlock =
  | {
    type: 'profile';
    imageUrl: string;
    altText: string;
  }
  | {
    type: 'link';
    title: string;
    url: string;
  }
  | {
    type: 'product';
    productName: string;
    buyUrl: string;
  }
  | {
    type: 'dm';
    keyword: string;
    message: string;
  };

export interface BioPage {
  userSlug: string;
  themeConfig: ThemeConfig;
  blocksList: BioBlock[];
}