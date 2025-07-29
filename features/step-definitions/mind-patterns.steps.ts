import { Given, Then, When } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import { Navigate } from "@serenity-js/web";
import { MindPatterns } from "../../test/quiz/MindPatterns";
import { Ensure, equals, includes, isTrue } from "@serenity-js/assertions";

Given(
  `{actor} is at the start of the Mind Patterns Quiz`,
  async (actor: Actor) => actor.attemptsTo(Navigate.to("/mind-patterns.html"))
);

When(
  "{actor} chooses {string} in Step {}",
  async (actor: Actor, option: string, step: number) =>
    actor.attemptsTo(MindPatterns.choose(step, option))
);

When('{actor} chooses {string} and {string}', async (actor: Actor, option1: string, option2: string) => 
  actor.attemptsTo(
    MindPatterns.choose(1, option1),
    MindPatterns.choose(2, option2)
  )
);


Then(
  "{actor} should see only {string} and {string} in Step {}",
  async (actor: Actor, expectedOptionA: string, expectedOptionB: string, step: number) =>
    actor.attemptsTo(
        Ensure.that(MindPatterns.getStepOptionsCount(step), equals(2)),
        Ensure.that(MindPatterns.getStepOptionsKeys(step)[0], equals(expectedOptionA)),
        Ensure.that(MindPatterns.getStepOptionsKeys(step)[1], equals(expectedOptionB))
    )
);

Then(
  "{actor} should see only {string} in Step {}",
  async (actor: Actor, expectedOption: string, step: number) =>
    actor.attemptsTo(
        Ensure.that(MindPatterns.getStepOptionsCount(step), equals(1)),
        Ensure.that(MindPatterns.getStepOptionsKeys(step)[0], equals(expectedOption))
    )
);

Then(
  '{actor} should see their Mind Pattern as {string}', 
  async (actor: Actor, mindPattern: string) => 
    actor.attemptsTo(
        MindPatterns.confirmChoice(),
        Ensure.that(MindPatterns.getMindPatternText(), includes(`${mindPattern} Pattern`))
    )
);

When('{actor} cancels their choices', async (actor: Actor) => 
  actor.attemptsTo(MindPatterns.cancelChoices())
);

Then('{actor} should return to Step 1', async (actor: Actor) => 
  actor.attemptsTo(
    Ensure.that(MindPatterns.hasReset(), isTrue())
  )
);

