import i18n from 'i18next';
import { AcademicPathway } from '../types';
import { 
  ACADEMIC_PATHWAYS, 
  INTERMEDIATE_GROUPS, 
  POLYTECHNIC_DIPLOMAS, 
  ITI_VOCATIONAL_TRADES,
  IntermediateGroup,
  PolytechnicDiploma,
  ITIVocationalTrade
} from '../data/coursesData';

export function getLocalizedPathway(pathway: AcademicPathway): AcademicPathway {
  const pathwayKey = pathway.id.toLowerCase();
  const hasTranslation = i18n.exists(`pathways.${pathwayKey}.name`);

  if (!hasTranslation) {
    return pathway;
  }

  return {
    ...pathway,
    name: i18n.t(`pathways.${pathwayKey}.name`, { defaultValue: pathway.name }),
    duration: i18n.t(`pathways.${pathwayKey}.duration`, { defaultValue: pathway.duration }),
    eligibility: i18n.t(`pathways.${pathwayKey}.eligibility`, { defaultValue: pathway.eligibility }),
    description: i18n.t(`pathways.${pathwayKey}.description`, { defaultValue: pathway.description }),
    category: i18n.t(`pathways.${pathwayKey}.category`, { defaultValue: pathway.category }) as AcademicPathway['category'],
  };
}

export function getLocalizedPathways(): AcademicPathway[] {
  return ACADEMIC_PATHWAYS.map(getLocalizedPathway);
}

export function getLocalizedIntermediateGroups(): IntermediateGroup[] {
  return INTERMEDIATE_GROUPS.map((group) => {
    const key = group.name.toLowerCase();
    const hasTranslation = i18n.exists(`pathways.${key}.name`);
    if (hasTranslation) {
      return {
        ...group,
        name: i18n.t(`pathways.${key}.name`, { defaultValue: group.name }),
      };
    }
    return group;
  });
}

export function getLocalizedPolytechnicDiplomas(): PolytechnicDiploma[] {
  return POLYTECHNIC_DIPLOMAS;
}

export function getLocalizedITITrades(): ITIVocationalTrade[] {
  return ITI_VOCATIONAL_TRADES;
}
