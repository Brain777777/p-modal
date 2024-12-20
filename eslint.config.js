import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
  },
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'antfu/top-level-function': 'off',
    },
  },
)
