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

- [ ] option update
  - [x] disabled next button when the elment isn't empty
  - [ ] choose a option
  - [x] submit a option
    - [x] check the option
  - [x] show the value in input element
- [x] enable change input's value
- [ ] change the statu when clear the choice for each item