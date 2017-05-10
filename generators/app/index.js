'use strict';
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp')
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the outstanding ' + chalk.red('generator-mklib-typescript') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Name your library',
      default: this.appname,
    }, {
      type: 'input',
      name: 'description',
      message: 'What is your library about?',
      default: '',
    }, {
      type: 'input',
      name: 'author',
      message: 'e.g. Bill Gates',
      default: '',
    }, {
      type: 'input',
      name: 'repo',
      message: 'Git repository',
      default: '',
    }, {
      type: 'list',
      name: 'target',
      message: 'Specify ECMAScript target version',
      choices: [
        'ES6',
        'ES5',
      ],
      default: 0,
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author,
        repo: this.props.repo,
      }
    );
    this.fs.copyTpl(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json'), {
        target: this.props.target,
      }
    );
    this.fs.copy(
      this.templatePath('lib/index.ts'),
      this.destinationPath('lib/index.ts')
    );
    this.fs.copy(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('test'),
      this.destinationPath('test')
    );
    this.fs.copy(
      this.templatePath('yarn.lock'),
      this.destinationPath('yarn.lock')
    );
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
  }

  install() {
    this.installDependencies();
  }
};
