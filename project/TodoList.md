# Todo List

## Option Flow

```flow
st=>start: option
e=>end
cond=>condition: 使用默认值?
cond2=>condition: 下一题?
cond3=>condition: 选择结果?
c2=>operation: updateMethod
c1=>operation: updateAnswer
io=>inputoutput: catch something...

st(right)->cond
cond(yes,right)->cond2
cond(no)->c2->cond2
cond2(yes)->e
cond2(no)->cond3
cond3(yes)->e
cond3(no)->c1->e
```

## Todo list

* [x] option update
  * [x] disabled next button when the elment isn't empty
  * [x] choose a option
  * [x] submit a option
    * [x] check the option
  * [x] show the value in input element
* [x] enable change input's value
* [x] change the statu when clear the choice for each item

## 项目的一些思考

由于工作上的原因，好久没有继续进行这个项目了，想起之前也进入了一个瓶颈，之前都是想到哪里做到哪里，只有一个大致的轮廓，现在想想接下来的方向要怎么去做。接下来要实现的完善交互体验。优先去做设计部分的功能，再去做体验部分的功能，最后去搭建后台，这是三步走的宏观实现，当前进度初步预估 50%了吧。

## TodoList(2018/06)

这个月的 Todo ， 主要包括三大方面吧， 一是核心功能， 二是调试入口，三是交互。
