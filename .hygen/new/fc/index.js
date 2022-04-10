module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'コンポーネントの名前を入力してください。',
      },
    ]

    return inquirer.prompt(questions)
  },
}
