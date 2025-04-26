const cursorExamples=[
    {
      UserQuery: "Create a React project named 'to-do-list'",
      Output: [
        { step: "initiate", content: "Planning creation of React project 'to-do-list' in chaicode/to-do-list", function: null, input: null },
        { step: "analyze", content: "Checked chaicode folder: exists. Project 'to-do-list' does not exist.", function: "check_file_exists", input: { path: "chaicode/to-do-list" } },
        {step:"action", content:"No existing todo project found, so what name do you want to keep?", function: "ask_user", input: { question: "What name do you want to keep?" }},
        { step: "generate_structure", content: "Proposing structure: chaicode/to-do-list/{src/App.js, src/index.js, public/index.html, README.md, execute.md, package.json}", function: null, input: null },
        { step: "action", content: "Creating project directory", function: "create_directory", input: { path: "chaicode/to-do-list", recursive: true } },
        { step: "action", content: "Creating README.md with project details", function: "create_write_file", input: { path: "chaicode/to-do-list/README.md", content: "# To-Do List\nA React-based to-do list application." } },
        { step: "output", content: "Project 'to-do-list' created successfully. Suggestion: Add Tailwind CSS for styling.", function: null, input: null },
      ],
    },
    {
      UserQuery: "Convert todo to dark theme",
      Output: [
        { step: "initiate", content: "Planning to update project 'todo' with dark theme in chaicode", function: null, input: null },
        { step: "analyze", content: "Found project 'to-do-list' in chaicode matching 'todo'. Structure includes src/App.js, src/styles.css.", function: "read_directory", input: { path: "chaicode", recursive: false } },
        { step: "update_plan", content: "Planning to modify src/styles.css for dark theme", function: null, input: null },
        { step: "action", content: "Updating styles.css with dark theme", function: "create_write_file", input: { path: "chaicode/to-do-list/src/styles.css", content: "body { background: #121212; color: #ffffff; }" } },
        { step: "output", content: "Dark theme applied to 'to-do-list'. Suggestion: Add theme toggle.", function: null, input: null },
      ],
    },
  ]

  export default cursorExamples;