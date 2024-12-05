import { match, P } from 'ts-pattern';

export type CareerType = '경력무관' | '신입' | '경력 5년 미만' | '경력 5년 이상';

export const parseCareer = (career: string) => {
  return match(career)
    .with('경력무관', () => ({ type: 'any' as const }))
    .with('신입', () => ({ type: 'newcomer' as const }))
    .with(P.string.includes('년 미만'), value => ({
      type: 'less' as const,
      years: parseInt(value.match(/(\d+)년/)?.[1] || '0', 10),
    }))
    .with(P.string.includes('년 이상'), value => ({
      type: 'more' as const,
      years: parseInt(value.match(/(\d+)년/)?.[1] || '0', 10),
    }))
    .otherwise(() => ({ type: 'any' as const }));
};

export const isCareerMatch = (filterCareer: string, recruitmentCareer: string) => {
  const filterParsed = parseCareer(filterCareer);
  const recruitmentParsed = parseCareer(recruitmentCareer);

  return match(filterParsed)
    .with({ type: 'any' }, () => true)
    .with({ type: 'newcomer' }, () =>
      match(recruitmentParsed)
        .with({ type: 'newcomer' }, () => true)
        .with({ type: 'more', years: 0 }, () => true)
        .with({ type: 'less', years: 0 }, () => true)
        .otherwise(() => false),
    )
    .with({ type: 'less' }, filter =>
      match(recruitmentParsed)
        .with({ type: 'more' }, recruitment => recruitment.years < filter.years)
        .with({ type: 'less' }, recruitment => recruitment.years <= filter.years)
        .with({ type: 'newcomer' }, () => true)
        .otherwise(() => false),
    )
    .with({ type: 'more' }, filter =>
      match(recruitmentParsed)
        .with({ type: 'more' }, recruitment => recruitment.years >= filter.years)
        .with({ type: 'less' }, () => false)
        .with({ type: 'newcomer' }, () => false)
        .otherwise(() => false),
    )
    .otherwise(() => false);
};
