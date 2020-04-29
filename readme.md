# [Intro to Vue.js](https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance/)

## 1. The Vue Instance

* How to begin writing a Vue application with a Vue instance, and how to load basic data onto the webpage
* The Vue instance is the root of every Vue application
* The Vue instance plugs into a elemento in the DOM
* The Vue instace's data can be displayed using the mustache-like syntax `{{}}` called and expression
* Vue is reactive

## 2. Attribute binding

* Data can be bound to HTML attributes
* Syntax is `v-bind:` or `:` for short
* The attribute name that comes after the : specifies the attribute we're binding data to
* Inside the attribute's quotes, we reference the data we're binding to

## 3. Conditional Rendering
* There are Vue directives to conditionally render elements:
    * `v-if`
    * `v-if-else`
    * `v-else`
    * `v-show`
* If whatever is inside the directive's quotes is truthy, the element will display
* You can use expressions inside the directive's quotes
* `V-show` only toggles visibility, it does not insert or remove the element from the DOM

## 4. List rendering
* The `v-for` directive allows us to iterate over an array to display data
* We use an alias for the element in the array being iterated on, and specify the name of the array we are looping through. Ex: `v-for="item in items"
* We can loop over an array of objects and use dot notation to display values from the objects
* When using `v-for` its is recommended to give each rendered element its own unique key

## 5. Event handling
* The `v-on` directive is used to allow elements to listen for events
* The shorthand for `v-on` is `@`
* You can specify the type of the event to listen for:
    * click
    * mouseover
    * any other DOM event
* The `v-on` directive can trigger a method
* Triggered methods can take in arguments
* `this` refers to the current Vue instance's data as well other methods declared inside the instance

## 6. Class & Style binding
* Data can be bound to an element's `style` attribute
* Data can be bound to an element's `class`
* We can use expressions inside an element's class binding to evaluate whether a class should appear or not
* You can bind an entire class object or array of classes to an element
```html
<div :class="classObject"></div>
<div :class="[activeClass, errorClass]"></div>
```

## 7. Computed properties
* Computed properties calculate a value rather than store a value
* Computed properties can use data from your app to calculate its values
> **What else should we know?**
>
> Computed properties are cached, meaning the result is saved until its dependencies change. So when `quantity` changes, the cache will be cleared ant the **next time you access the value of `inStock`, it will return a fresh result, and cache that result.
>
> With that in mind, it's more efficient to use a computed property trather than a method for an expensive operation that you don't want to re-run every time you access it.
> 
> It is also important to remember that you should not be mutationg your data model from within a computed property. You are merely computing values based on other values.
> Keep these functions pure.

## 8. Components
* Components are blocks of code, grouped together within a custom element
* Components make applications more manageable by breaking up the whole into reusable parts that have their own structure and behavior
* Data on a component mus be a function
* Props are used to pass data from parent to child
* We can specify requirements for the props a compoment is receiving
* Props are fed into a component through a custom attribute
* Props can be dynamically bound to the parent's data
* Vue dev tools provide helpful insight about your components

## 9. Communicating events
* A component can let its parent know that an event has happened with `$emit`
* A component can use an event handler with the `v-on` directive (`@` for short) to listen to for an event emission, which can trigger a method on the parent
* A component can `$emit` data along with the announcement that an event has occurred
* A parent can use data emitted from its child