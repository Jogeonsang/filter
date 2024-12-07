export type FilterBadge =
  | '국내 거주 필수'
  | '지역 제한 없음'
  | '정규직'
  | '계약직'
  | '프리랜서'
  | '주 20시간 미만'
  | '주 20-30시간'
  | '주 30-40시간'
  | '주 40시간 (풀타임)'
  | '시간 협의';

export type Recruitment = {
  id: number;
  company_name: string;
  title: string;
  badge: FilterBadge[];
  country: string;
  image_url: string;
  contents: string;
  like: boolean;
  occupation: string;
  region: string;
  employment_type: string;
  career: string;
  working_hours_per_week: string;
};

export interface FilterOptions {
  [key: string]: string;
  occupation: string;
  region: string;
  employment_type: string;
  career: string;
  working_hours_per_week: string;
}
