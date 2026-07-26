export interface TopicLink {
  title: string;
  slug: string;
}

export interface TopicGroup {
  id: string;
  title: string;
  description?: string;
  calculators: TopicLink[];
}