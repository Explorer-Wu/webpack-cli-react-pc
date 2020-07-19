# webpack-cli-react-pc
> Webpack-cli构建PC端react单页面应用模版

## Available Scripts
In the project directory, you can run:

### 开发坏境
* 安装 
```sh
    npm install / yarn install
``` 
* 公共库或代码打包
```sh
    npm run dlllibs / yarn dlllibs
``` 
* 开发环境服务启动
```sh
    npm run start / yarn start
```
* 测试
```sh
    npm run test / yarn test
```

Runs the app in the development mode.<br>
Open [http://localhost:3603](http://localhost:3603) to view it in the browser.


### 生产坏境打包压缩
```sh
    npm run build / yarn build
``` 

### 生产环境打包并查看分析报告
```sh
    npm run build --report / yarn build --report
```

### 部署
拷贝dist文件夹至服务器即可



## React组件化
* 高阶组件（HOC）
大的维度上 HOC 的作用：
1. 代码重用和逻辑抽象
2. render 劫持
3. state 抽象和操纵
4. 操纵属性（props）

HOC 工厂实现: 属性代理（PP）和继承反转（II）
- 属性代理：由 HOC 操纵那些被传递给被包裹组件W 的 props
    属性代理作用如下：
    1. 操纵属性
    2. 通过 refs 访问实例
    3. 抽象 state
    4. 包裹组件

- 继承反转：HOC 继承被包裹组件W
    继承反转作用如下：
    1. render 劫持
    2. 操纵 state

    继承反转实现代码：
    ```
    function iiHOC(WrappedComponent) {
        return class Enhancer extends WrappedComponent {
            render() {
            return super.render()
            }
        }
    }
    ```
    继承反转使得 HOC 可以用 this 访问被包裹组件的实例，这意味着可以访问 state、props、组件生命周期钩子，以及 render 方法

## React生命周期
* 挂载
当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：
- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

* 更新
当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：
- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

* 卸载
当组件从 DOM 中移除时会调用如下方法：
- componentWillUnmount()

* 错误处理
当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：
- static getDerivedStateFromError()
- componentDidCatch()

```
    static getDerivedStateFromProps(props, state)
```
getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

此方法无权访问组件实例。如果你需要，可以通过提取组件 props 的纯函数及 class 之外的状态，在getDerivedStateFromProps()和其他 class 方法之间重用代码。

注： 此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props。否则摒弃该方法。某个state值要么由props驱动，要么完全由state驱动。 

```
    shouldComponentUpdate(nextProps, nextState)
```
根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。

当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。返回值默认为 true。首次渲染或使用 forceUpdate() 时不会调用该方法。

此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。你应该考虑使用内置的 PureComponent 组件，而不是手动编写 shouldComponentUpdate()。PureComponent 会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。

如果你一定要手动编写此函数，可以将 this.props 与 nextProps 以及 this.state 与nextState 进行比较，并返回 false 以告知 React 可以跳过更新。请注意，返回 false 并不会阻止子组件在 state 更改时重新渲染。

我们不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringify()。这样非常影响效率，且会损害性能。

### react-router-dom、react-router-config和history
这三个相关库注意版本依赖关系和官网版本的一致，如果webpack打包，采用DllPlugin作为第三方库引入，最好一起。其他类似三方库做法一样。

## Webpack 配置
### Tree Shaking
webpack 2 正式版本内置支持 ES2015 模块（也叫做 harmony modules）和未使用模块检测能力。 webpack 4 正式版本扩展了此检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。
* sideEffects 和 usedExports
    sideEffects 和 usedExports（更多被认为是 tree shaking）是两种不同的优化方式。
    - sideEffects 更为有效 是因为它允许跳过整个模块/文件和整个文件子树。
        "side effect(副作用)" 的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。

        通过 package.json 的 "sideEffects" 属性，来实现这种方式。例如：
    ```
        {
            "name": "your-project",
            "sideEffects": false
        }
    ```
        如果所有代码都不包含 side effect，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export。

        如果你的代码确实有一些副作用，可以改为提供一个数组：
    ```
        "sideEffects": [
            "**/*.css",
            "**/*.scss",
            "./esnext/index.js",
            "./esnext/configure.js"
        ],
    ```
        数组方式支持相对路径、绝对路径和 glob 模式匹配相关文件。它在内部使用 micromatch。

    >   注意：所有导入文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 css-loader 并 import 一个 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除。另外，还可以在 module.rules 配置选项 中设置 "sideEffects"。

    >   设置optimization.sideEffects为true，告知 webpack 去辨识 package.json 中的副作用标记或规则，以跳过那些当导出不被使用且被标记不包含副作用的模块。

    - usedExports 依赖于 terser 去检测语句中的副作用。它是一个 JavaScript 任务而且没有像 sideEffects 一样简单直接。而且它不能跳转子树/依赖由于细则中说副作用需要被评估。尽管导出函数能运作如常，但 React 框架的高阶函数（HOC）在这种情况下是会出问题的。

        optimization.usedExports,默认值true，告知 webpack 去决定每个模块使用的导出内容。这取决于 optimization.providedExports 选项。
        由 optimization.usedExports 收集的信息会被其它优化手段或者代码生成使用，比如未使用的导出内容不会被生成， 当所有的使用都适配，导出名称会被处理做单个标记字符。 在压缩工具中的无用代码清除会受益于该选项，而且能够去除未使用的导出内容。

    ```
        + mode: 'development',
        + optimization: {
        +   usedExports: true,
        + },
    ```

* 将函数调用标记为无副作用
只要通过 /*#__PURE__*/ 注释，就可告知 webpack 某个函数调用是无副作用的。它可以被放到函数调用之前，用来标记它们是无副作用的(pure)。传到函数中的入参是无法被刚才的注释所标记，需要单独每一个标记才可以。
如果一个没被使用的变量定义的初始值被认为是无副作用的（pure），它会被标记为死代码，不会被执行且会被压缩工具清除掉。这个行为被会开启当 optimization.innerGraph 被设置成 true。
    例如，file.js：
    ```
        /*#__PURE__*/ double(55);
    ```
* 压缩输出结果
 通过 import 和 export 语法，可找出需要删除的“未引用代码(dead code)”。而将 mode 配置选项设置为 production，可以在 bundle 中删除它们。
    例如，webpack.config.js：
    ```
        module.exports = {
            entry: './src/index.js',
            output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, 'dist'),
            },
            - mode: 'development',
            - optimization: {
            -   usedExports: true,
            - }
            + mode: 'production',
        };
    ```
> 注意，也可以在命令行接口中使用 --optimize-minimize 标记，来启用 TerserPlugin。
> 在使用 tree shaking 时必须有 ModuleConcatenationPlugin 的支持。通过设置配置项 mode: "production" 以启用它。非此mode,请手动引入 ModuleConcatenationPlugin。

* tree shaking使用总结
- 使用 ES2015 模块语法（即 import 和 export）。
- 确保没有编译器将您的 ES2015 模块语法转换为 CommonJS 的语法（这是现在常用的 @babel/preset-env 的默认行为）
- 在项目的 package.json 文件中，添加 "sideEffects" 属性。
- 使用 mode 为 "production" 的配置项以启用更多优化项，包括压缩代码与 tree shaking。

### 作用域提升(scope hoisting)
“提升”或将所有模块的范围合并为一个Closure，从而使您的代码在浏览器中具有更快的执行时间。
> 实现原理： 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突。

* 使用方法
- optimization.concatenateModules
告知 webpack 去寻找模块图形中的片段，哪些是可以安全地被合并到单一模块中。这取决于 optimization.providedExports 和 optimization.usedExports。 默认情况下， optimization.concatenateModules 在生产模式下被启用，而在其它情况下被禁用(将optimization.concatenateModules选项设置为false)。
>   注：concatenateModules仅适用于由webpack直接处理的ES6模块。使用编译器时，您需要禁用模块处理（例如modulesBabel中的选项）。

- mainFields配置
针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
```
    resolve:{
        mainFields: ['jsnext:main', 'browser', 'main']
    }
```

* 无效原因
    1. 代码不是用ES6模块语法写的，但是大部分 NPM 中的模块仍然是 CommonJS 语法（例如 lodash），所以导致 Webpack 回退到了默认的打包方式。
    2. 使用了 ProvidePlugin
    3. 使用了 eval() 函数
    4. 你的项目有多个 entry

* 查失效问题
    运行 Webpack 时加上 --display-optimization-bailout 参数可以得知为什么你的项目无法使用 Scope Hoisting？                                          
    ```
        webpack --display-optimization-bailout
    ```
    输出日志中会提示哪个文件导致了降级处理。  

>   注：当optimization.concatenateModules置为true时，模块热替换将不起作用，所以最好只在生产模式下代码优化时候才设为true，否则为false。

### webpack-dev-server
webpack-dev-server提供了两种自动刷新模式：iframe和inline
* iframe模式（默认模式）
页面被嵌套在一个iframe下，代码发生改动后，iframe会重新加载
使用此模式无需额外配置，只需访问http://localhost:8080/webpack-dev-server/index.html即可。

* inline模式
此方式会将webpack-dev-server客户端加入到webpack入口文件的配置中。
配置方式有两种：CLI配置和通过Node.js Api手动配置
    1）CLI 方式
    只需在webpack.dev.server启动的命令中加入--inline即可
    修改package.json中scripts配置，添加--inline：
    ```
        "scripts":{
            "start":"webpack-dev-server --inline --config webpack.config.dev.js"
        }
    ```
    2）Node.js Api方式
    此方式需要手动将webpack-dev-server客户端配置到webpack打包的入口文件中
    我们在start.js设置 `inline: true` 即可