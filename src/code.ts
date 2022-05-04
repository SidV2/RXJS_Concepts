import { Observable, Subject } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

emit values over time, basically a stream concept
let observable = new Observable((observer) => {
    try {
        observer.next('Hey guys');
        observer.next('How are you?');
        setInterval(() => {
            observer.next('I am good');
        }, 2000);
    }
    catch (err) {
        observer.error();
    }
}).pipe(share()); //pipe will chain operators

to get value you have to subscribe to the above observable
let observer = observable.subscribe({
    next(x) { console.log('got value ' + x); },
    error(err) { console.error('something wrong occurred: ' + err); },
    complete() { console.log('done'); }
});

second observer
let observer2 = observable.subscribe({
    next(x) { console.log('got value ' + x); },
    error(err) { console.error('something wrong occurred: ' + err); },
    complete() { console.log('done'); }
});

observer 2 added to observer so now they both will be unsubscribed in the settimeout func below
observer.add(observer2);

cancel subscription to not receive values anymore
setTimeout(() => {
    observer.unsubscribe();
}, 6001);

hot observable
let observableMouseEvent = fromEvent(document, 'mousemove');
setTimeout(() => {
    observableMouseEvent.subscribe(observer => {
        console.log(observer);
    });
}, 2000);

create a Subject a special type of observer and also an observable
let subject = new Subject();
subject.subscribe(data => {
    console.log(data);
});

//send or emit as an observable
subject.next("Subject item sent");

//operator map example
const observable3 = new Observable((observer: any) => {
    observer.next("hello");
}).pipe(map(data => data.toString().toUpperCase())).subscribe(data => console.log(data));


import { Observable, Subject } from 'rxjs';

import { Observable, Subject } from 'rxjs';

const subject = new Subject<number>();

//Cold observables
const observable1 = new Observable((observer) => {
  observer.next(Math.random()); //lazy will only emit when subscribed
});

const observable2 = new Observable((observer) => {
  observer.next(Math.random()); //lazy will only emit when subscribed
});
observable1.subscribe((data) => console.log(data));
observable2.subscribe((data) => console.log(data));

//Hot observables
subject.subscribe((data) => console.log('Subscriber A', data));
subject.subscribe((data) => console.log('Subscriber B', data));
subject.next(Math.random());
subject.next(Math.random());

//Deep Copy objects in JS. Can be used for reducers in ngRX
let a = {
    name: 'Sid,
    address: {
        city: 'Windsor'
    }
}
let adress = {...a.address, city: 'London'};
let modifiedState = {...a, name: 'Sid1', address: adress};


//Alternative way
let a = {
    name: 'Sid',
    address: {
        city: 'Windsor',
        town: {
            name: 'Josephine'
        }
    }
}
const b = {
    ...a,
    address: {
        ...a.address,
        city: 'London',
        town: {
            ...a.town,
            name: 'Josephine1'
        }
    }
}
