var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        // Assigns argument to this.options.projectName
        this.argument("projectName", {desc: "Name of the project.", type: String, required: false});

        if (this.options.projectName) {
            this.log(`Creating project '${this.options.projectName}' ...`);
        }
    }
    
    async prompting() {
        let questions = []
        // If this.options.projectName not assigned via argument,
        // prompts user for project name and assignes it to this.answers.projectName
        if (!this.options.projectName) {
            questions.push({
                type: 'input',
                name: 'projectName',
                message: 'Project name (must not contain \' \' or \'.\'):',
            });
        }
        this.answers = await this.prompt(questions);
    }
    
    writing() {
        let projectName = this.options.projectName ? this.options.projectName : this.answers.projectName;
        this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
        this.fs.extendJSON(this.destinationPath('package.json'), {name: projectName});
        this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));
        this.fs.copy(this.templatePath('webpack.common.js'), this.destinationPath('webpack.common.js'));
        this.fs.copy(this.templatePath('webpack.dev.js'), this.destinationPath('webpack.dev.js'));
        this.fs.copy(this.templatePath('webpack.prod.js'), this.destinationPath('webpack.prod.js'));
        this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
        this.fs.copy(this.templatePath('src/index.tsx'), this.destinationPath('src/index.tsx'));
        this.fs.copyTpl(
            this.templatePath('src/index.html'),
            this.destinationPath('src/index.html'),
            {title: projectName}
        );
        this.fs.copy(this.templatePath('src/polyfills.ts'), this.destinationPath('src/polyfills.ts'));
        this.fs.copy(this.templatePath('src/components'), this.destinationPath('src/components'));
    }

    install() {
        this.log('Installing packages...');
        this.npmInstall();
    }
};