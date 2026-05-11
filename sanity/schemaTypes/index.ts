import { type SchemaTypeDefinition } from 'sanity'
import { blockContent } from './objects/blockContent'
import { altImage } from './objects/altImage'
import { stat } from './objects/stat'
import { donationItem } from './objects/donationItem'
import { homepageHero } from './homepageHero'
import { aboutUs } from './aboutUs'
import { location } from './location'
import { projectCategory } from './projectCategory'
import { project } from './project'
import { campaign } from './campaign'
import { downloadableFile } from './file'
import { ecosystemStage } from './ecosystemStage'
import { intention } from './intention'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // objects
    blockContent,
    altImage,
    stat,
    donationItem,

    // documents
    intention,
    downloadableFile,
    ecosystemStage,
    homepageHero,
    aboutUs,
    location,
    projectCategory,
    project,
    campaign,
  ],
}
