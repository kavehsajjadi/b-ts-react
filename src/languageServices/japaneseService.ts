type WordResult<Meta> = {
  word: string
  definitions: string[]
  meta: Meta | undefined
}

type JapaneseMeta = {
  reading: string
}

type JapaneseResult = WordResult<JapaneseMeta>

interface LanguageServiceI<ResultType> {
  language: string
  searchByEnglish({ query: string }): Promise<Array<ResultType>>
  searchByLanguage({ query: string }): Promise<Array<ResultType>>
}

export class JapaneseService implements LanguageServiceI<JapaneseResult> {
  private readonly url = "https://jisho.org/api/v1/search/words"
  language = "jp"

  private async query(query: string) {
    return fetch(this.url, {
      method: "get",
    })
  }

  async searchByEnglish({ query }) {
    const response = await this.query(query)
    const body = await response.json()
    const rawResults = body.data.data
    return rawResults.map(({ japanese, senses }) => ({
      word: japanese[0].word,
      definitions: this.flattenSenses(senses),
      meta: {
        reading: japanese[0].reading,
      },
    }))
  }

  searchByLanguage({ query }) {
    return this.searchByEnglish({ query })
  }

  flattenSenses(senses): string[] {
    const definitions = []
    senses.forEach(({ english_definitions }) => {
      english_definitions.forEach(definition => {
        definitions.push(definition)
      })
    })
    return definitions
  }
}
