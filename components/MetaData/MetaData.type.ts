export interface ActivityPageMetaProps {
  title?: string;
  description?: string;
  bannerImageUrl?: string;
  currentUrl?: string;
}
export interface InitialPageMetaProps {
  title: string;
  url?: string;
}

export interface SSRMetaProps {
  OGTitle: string;
  OGUrl: string;
}
