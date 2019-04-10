import * as fetchMock from "fetch-mock"
import { JapaneseService } from "./japaneseService"
import { fakes } from "./japaneseFakes"

describe("JapaneseService", () => {
  let service: JapaneseService

  beforeEach(() => {
    service = new JapaneseService()
  })

  it("searchByEnglish", async () => {
    fetchMock.mock("*", {
      data: fakes.house,
    })
    const results = await service.searchByEnglish({ query: "house" })
    expect(results).toMatchSnapshot()
  })

  it("searchByJapanese", async () => {
    const result = await service.searchByEnglish({ query: "house" })
    expect(result).toMatchSnapshot()
  })
})
