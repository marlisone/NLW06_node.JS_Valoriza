import { getCustomRepository } from 'typeorm'
import { TagsRepositories } from '../repositories/TagsRepositories'

class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories)

    if (!name) {
      throw new Error('Invalid name!')
    }
    const tagAlreadyExists = await tagsRepositories.findOne({ name })

    if (tagAlreadyExists) {
      throw new Error('Tag name already exists!!!')
    }
    const Tag = tagsRepositories.create({ name })
    await tagsRepositories.save(Tag)

    return Tag
  }
}
export { CreateTagService }
