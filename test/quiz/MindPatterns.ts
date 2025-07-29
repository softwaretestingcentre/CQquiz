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
    
    getStepOptionsKeys: (step: number) =>
        Question.about(`#actor sees options for Step ${step}`, async actor => {
            const allKeys = await actor.answer(Quiz.stepOptionKeys(step).eachMappedTo(Text));
            return allKeys;
        }),

    getStepOptionsCount: (step: number) =>
        Question.about(`#actor sees the number of options for Step ${step}`, async actor => {
            const optionCount = await actor.answer(Quiz.stepOptionKeys(step).count());
            return optionCount;
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

    cancelChoices: () =>
        Task.where(`#actor cancels their choices in the Mind Patterns Quiz`,
            Click.on(Quiz.cancelButton()),
        ),
    
    hasReset: () =>
        Question.about(`#actor has reset the Mind Patterns Quiz`, async actor => {
            const step1Options = await actor.answer(MindPatterns.getStepOptionsCount(1));
            const step2Visible = await actor.answer(Quiz.stepSection(2).isVisible());
            const step3Visible = await actor.answer(Quiz.stepSection(3).isVisible());
            return (step1Options === 3) && !step2Visible && !step3Visible;
        }),

}

const Quiz = {

    stepSection: (step: number) =>
        PageElement.located(By.css(`#step-${ step }`))
            .describedAs(`Step ${ step } section`),

    optionCard: (step: number, option: string) =>
        PageElement.located(By.css(`#step-${ step } .option-card[data-option="${ option }"]`))
            .describedAs(`option card "${ option }"`),

    stepOptionCards: (step: number) =>
        PageElements.located(By.css(`#step-${ step } .option-card`))
            .describedAs(`option cards for Step ${ step }`),

    stepOptionKeys: (step: number) =>
        PageElements.located(By.css(`#step-${ step } .option-key`))
            .describedAs(`option keys for Step ${ step }`),

    confirmButton: () =>
        PageElement.located(By.css('#confirm-choice'))
            .describedAs('Confirm Choice button'),

    mindPatternDetails: () =>
        PageElement.located(By.css('#details'))
            .describedAs('Mind Pattern details'),
    
    cancelButton: () =>
        PageElement.located(By.css('#change-choices'))
            .describedAs('Change Choices button'),
}