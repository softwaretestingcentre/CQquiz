import { Given, Then, When } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import { Navigate } from "@serenity-js/web";
import { MindPatterns } from "../../test/quiz/MindPatterns";
import { Ensure, equals, includes } from "@serenity-js/assertions";

Given(
  `{actor} is at the start of the Mind Patterns Quiz`,
  async (actor: Actor) => actor.attemptsTo(Navigate.to("/mind-patterns.html"))
);

When(
  "{actor} chooses {string} in Step {}",
  async (actor: Actor, option: string, step: number) =>
    actor.attemptsTo(MindPatterns.choose(step, option))
);

Then(
  "{actor} should see only {string} and {string} in Step {}",
  async (actor: Actor, expectedOptionA: string, expectedOptionB: string, step: number) =>
    actor.attemptsTo(
        Ensure.that(MindPatterns.getStepOptionsText(step).length, equals(2)),
        Ensure.that(MindPatterns.getStepOptionsText(step)[0], includes(expectedOptionA)),
        Ensure.that(MindPatterns.getStepOptionsText(step)[1], includes(expectedOptionB))
    )
);

Then(
  "{actor} should see only {string} in Step {}",
  async (actor: Actor, expectedOption: string, step: number) =>
    actor.attemptsTo(
        Ensure.that(MindPatterns.getStepOptionsText(step).length, equals(1)),
        Ensure.that(MindPatterns.getStepOptionsText(step)[0], includes(expectedOption))
    )
);

Then(
  '{actor} should see their Mind Pattern as {string}', 
  async (actor: Actor, mindPattern: string) => 
    actor.attemptsTo(
        MindPatterns.confirmChoice(),
        Ensure.that(MindPatterns.getMindPatternText(), includes(mindPattern))
    )
)
