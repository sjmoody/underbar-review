(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n > array.length) {
      return array;
    } else {
      return array.slice(array.length - n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // if is array
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === 'object') {
      for (var k in collection) {
        iterator(collection[k], k, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(item, index) {
      if (test(item)) {
        result.push(item);
      }
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var result = [];
    var filterArray = _.filter(collection, test);
    _.each(collection, function(item) {
      if (_.indexOf(filterArray, item) === -1) {
        result.push(item);
      }
    });
    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    // if iterator, run iterator on each position and create comparison array. Then get index of every uniq in comparison array, and push to result array array[uniqe in comparison array index]
    var result = [];
    var itArray = [];
    var indexArray = [];
    if (arguments.length > 1) {
      var func = arguments[1];
      _.each(array, function(item, index) {
        itArray.push(func(item));
      });
      _.each(itArray, function(item, index) {
        if (_.indexOf(indexArray, item) === -1) {
          result.push(array[index]);
          indexArray.push(item);
        }
      });
    } else {
      _.each(array, function(item) {
        if (_.indexOf(result, item) === -1) {
          result.push(item);
        }
      });
    }
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(collection, function(item) {
      result.push(iterator(item));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // init accumulator
    // if (accumulator === undefined) {
    //   accumulator = collection[0];
    // }
    // iterate through collection

    // Input: collection, iterator, and the accumulator which is usually but not always a number
    // Output: modified accumulator, same type as original accumulator
    // Constraints:
    // Edge cases: accumulator can be undefined; needs to set accumulator and then continue

    if (accumulator === undefined) {
      accumulator = collection[0];
      _.each(collection.slice(1), function(item) {
        accumulator = iterator(accumulator, item);
      });
    } else {
      _.each(collection, function(item) {
        accumulator = iterator(accumulator, item);
      });
    }
    return accumulator;
  };


  // PART II

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    /// reduce collection against function, assume initial true, if function returns false then end right away and return false, else return result
    var result = 0;
    if (arguments.length < 2) {
      // reduce function without iterator
      _.reduce(collection, function(memo, item) {
        if (item) {
          result++;
        }
      }, 0);
    } else {
      _.reduce(collection, function(memo, item) {
        if (iterator(item)) {
          result++;
        }
      }, 0);
    }

    // // reduce and return false if its ever false, otherwise continue
    // _.reduce(collection, function(memo, item) {
    //   // if iterator(item) is false then return false and end function
    //   if (arguments.length < 2) {
    //     if (item) {
    //       result++;
    //     }
    //   } else {
    //     if (iterator(item)) {
    //       result++;
    //     }
    //   }
    // }, 0);

    // only reach here if reduce function completes without returning false
    return result === collection.length;

    // return _.reduce(collection, function() {

    // })
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // use every and return false only if every is false

    // // case without iterator
    // if(!iterator){}
    // // compare every item in collection
    // // case with iterator
    // if (iterator){

    // }

    // check if element is true or false.
    var checkFalse = function(value) {
      return value ? false : true;
    };
    if (arguments.length === 1) {
      var itemArray = _.map(collection, checkFalse);
      if ( _.contains(itemArray, false)) {
        return true;
      } else {
        return false;
      }
    } else {
      // if iterator
      var valueArray = _.map(collection, iterator);
      var itemArray = _.map(valueArray, checkFalse);
      if ( _.contains(itemArray, false)) {
        return true;
      } else {
        return false;
      }
    }
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      if (typeof arguments[i] === 'object') {
        for (var k in arguments[i]) {
          obj[k] = arguments[i][k];
        }
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      if (typeof arguments[i] === 'object') {
        for (var k in arguments[i]) {
          // check if value already exists
          if (obj[k] === undefined) {
            obj[k] = arguments[i][k];
          }
        }
      }
    }
    return obj;
  };


  // Commit here

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };


  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // init argumentList
    var argumentList = {};
    var result;
    // check if arguments in argument list
    // if in argumentList, return value from argumentList
    // if not in argument list, call
    return function() {
      if (argumentList[JSON.stringify(arguments)] === undefined) {
        result = func.apply(this, arguments);
        argumentList[JSON.stringify(arguments)] = result;
      } else {
        result = argumentList[JSON.stringify(arguments)];
      }
      return result;
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // var args = Array.prototype.slice.call(arguments);
    var listArg = (Array.prototype.slice.call(arguments, 2));
    // var listArg = (Array.prototype.slice.call(arguments)).slice(2);
    setTimeout(function() {
      return func.apply(this, listArg);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var dupArr = array.slice();
    var newArr = [];
    while (dupArr.length > 0) {
      var index = Math.floor(Math.random() * dupArr.length);
      newArr.push(dupArr[index]);
      dupArr.splice(index, 1);
    }
    return newArr;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var result = [];
    if (typeof functionOrKey === 'string') {
      // apply
      _.each(collection, function(item) {
        result.push(item[functionOrKey](args));
      });
    } else if (typeof functionOrKey === 'function') {
      _.each(collection, function(item) {
        result.push(functionOrKey.apply(item, args));
      })

    }
    return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // Input: collection and iterator
    // Example iterators:
    //
    // Output: array with sorted results of iterator
    // Constraints:
    // Edge cases: if an element is undefined, put them at the end
    // if iterator is a string that is a method such as "length" then use result of length method to sort
    // 1. If iterator is string, check for keys that match string and sort by that string
    // 2.

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
