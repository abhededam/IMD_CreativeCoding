import gym
from model import Model
from A2CAgent import A2CAgent

env = gym.make("CartPole-v0")
model = Model(num_actions = env.action_space.n)

obs = env.reset()

agent = A2CAgent(model)
rewards_sum = agent.train(env)
print("%d out of 200" % agent.test(env))

#action, value = model.action_value(obs[None, :])

#print(action, value)