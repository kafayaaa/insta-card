export interface LinkCardProps {
  id: string;
  title: string;
  url: string;
  order: number;
  trash?: boolean;
  onDelete?: () => void;
}
