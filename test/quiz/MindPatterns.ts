import { Question, Task } from "@serenity-js/core";
import { By, Click, PageElement, PageElements, Text } from "@serenity-js/web";

export const MindPatterns = {
    choose: (step: number, option: string) =>
        Task.where(`#actor chooses ${ option } in the Mind Patterns Quiz`,
            Click.on(Quiz.optionCard(step, option)),
        ),
    getStepOptionsText: (step: number) =>
        Question.about(`#actor sees options for Step ${step}`, async actor => {
            const allTexts = await actor.answer(Quiz.stepOptionCards(step).eachMappedTo(Text));
            return allTexts;
        }),

    confirmChoice: () =>
        Task.where(`#actor confirms their choice in the Mind Patterns Quiz`,
            Click.on(Quiz.confirmButton()),
        ),

    getMindPatternText: () =>
        Question.about(`#actor sees their Mind Pattern`, async actor => {
            const mindPatternText = await actor.answer(
                Text.of(Quiz.mindPatternDetails())
            );
            return mindPatternText;
        }),

    }

const Quiz = {
    optionCard: (step: number, option: string) =>
        PageElement.located(By.css(`#step-${ step } .option-card[data-option="${ option }"]`))
            .describedAs(`option card "${ option }"`),

    stepOptionCards: (step: number) =>
        PageElements.located(By.css(`#step-${ step } .option-card`))
            .describedAs(`option cards for Step ${ step }`),

    confirmButton: () =>
        PageElement.located(By.css('#confirm-choice'))
            .describedAs('Confirm Choice button'),

    mindPatternDetails: () =>
        PageElement.located(By.css('#details'))
            .describedAs('Mind Pattern details'),
}