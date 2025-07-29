import { Question, Task } from "@serenity-js/core";
import { By, Click, PageElement, PageElements, Text } from "@serenity-js/web";

export const MindPatterns = {
    choose: (option: string) =>
        Task.where(`#actor chooses ${ option } in the Mind Patterns Quiz`,
            Click.on(Quiz.optionCard(option)),
        ),
    getStepOptionsText: (step: number) =>
        Question.about(`#actor sees options for Step ${step}`, async actor => {
            const allTexts = await actor.answer(Quiz.stepOptionCards(step).eachMappedTo(Text));
            return allTexts.join(', ');
        })

    }

const Quiz = {
    optionCard: (option: string) =>
        PageElement.located(By.css(`.option-card[data-option="${ option }"]`))
            .describedAs(`option card "${ option }"`),

    stepOptionCards: (step: number) =>
        PageElements.located(By.css(`#step-${ step } .option-card`))
            .describedAs(`option cards for Step ${ step }`),

}