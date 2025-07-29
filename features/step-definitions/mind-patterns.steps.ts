import { Given, Then, When } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import { Navigate } from "@serenity-js/web";
import { MindPatterns } from "../../test/quiz/MindPatterns";
import { Ensure, includes } from "@serenity-js/assertions";

Given(
  `{actor} is at the start of the Mind Patterns Quiz`,
  async (actor: Actor) => actor.attemptsTo(Navigate.to("/mind-patterns.html"))
);

When(
  "{actor} chooses {string} in Step 1",
  async (actor: Actor, option: string) =>
    actor.attemptsTo(MindPatterns.choose(option))
);

Then(
  "{actor} should see {string} and {string} in Step 2",
  async (actor: Actor, expectedOptionA: string, expectedOptionB: string) =>
    actor.attemptsTo(
        Ensure.that(MindPatterns.getStepOptionsText(2), includes(expectedOptionA)),
        Ensure.that(MindPatterns.getStepOptionsText(2), includes(expectedOptionB))
    )
);
