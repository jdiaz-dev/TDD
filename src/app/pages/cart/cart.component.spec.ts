import { CartComponent } from "./cart.component"
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClient, HttpClientModule, HttpHandler } from "@angular/common/http";
import { Book } from "src/app/models/book.model";

/* 
    id?: string;
    name: string;
    author: string;
    isbn: string;
    description?: string;
    photoUrl?: string;
    price?: number;
    amount?: number;
*/


//constant that need our test
const listBook: Book[] = [
    {
        //adding this params because aren't optionals
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    },
    {
        //adding this params because aren't optionals
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1
    },
    {
        //adding this params because aren't optionals
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    }
]


//describe make reference to component
//indicating that it is test to a component
//all content of our test will be contained between describe method
//indicating name of component
describe('Cart component', () => {
//fdescribe('Cart component', () => { //using fdescribe(), only test if this file will be executed
//xdescribe('Cart component', () => { //using xdescribe all test for this file should be canceled, it is very usefull when want to comment a test momently

    //as we want to test a component, we need to create that component
    let component: CartComponent

    //this variable will be used to extract in our component for instance a service
    let fixture: ComponentFixture<CartComponent> //indicating type
    
    let service:BookService


    //creating events for instance BeforeEach, it will be called before to execute a test 
    //this will be test configuration
    beforeEach(() => {

        //between beforeEach, we can create configuration file testBed
        //the TestBed take more time when we developing
        TestBed.configureTestingModule({

            //this is a object of configuration , this object provide everything that this test is using
            imports: [ //here always modules, for instance we can add anguar material module here

                //this module is used due that our component use a service with http request
                HttpClientTestingModule //it doesn't make a real request to void make real request
                //HttpClientModule //no use it never also
            ],
            declarations: [ //here always components
                CartComponent //we need to place the componenet that we are using in our test
            ],
            providers: [ //here always services
                //in provider always will be services injected in the constructor of component

                BookService,
                //ERROR ------------------- : here we never must provide HttpClient or HttpHandler (services), but now the problem is that we will be doing real request, these modules are managed by HttpClientModule
                //HttpClient,
                //HttpHandler
            ],

            //schemas are optional
            schemas: [

                //these constants are recommended when we make unit test
                CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
            ]
        }).compileComponents() // it is important for the components are compiled correctly 
    })

    /* 
        ngOnInit(): void {
            this.listCartBook = this._bookService.getBooksFromCart();
            this.totalPrice = this.getTotalPrice(this.listCartBook);
        }
    */


    //this will be the instance of test
    beforeEach(() => {

        fixture = TestBed.createComponent(CartComponent) //extrating component of testBed
        component = fixture.componentInstance, //instantiating the component
        fixture.detectChanges() //after to use it will be entering throught ngOnInit()

         // ============== the third CORRECT way to call the service
        //calling the service from fixture
        //important to instantiate after to instantiate the component
        service = fixture.debugElement.injector.get(BookService)

        //to accomplish with unit test, to void call getBooksFromCart() method
        jest.spyOn(service, 'getBooksFromCart').mockImplementation(() => listBook)
    })


    //it will be executed after every test
    afterEach( () => {
        fixture.destroy() //to destroy the fixture, then fixture will be renoved in every test
        jest.resetAllMocks() //reset all mocks that we have created in every test
    })





    //every it is a test
    //creating most basic test
    //the first param is name of test
    it('should create', () => {

        //in a test it is important to have at least one expect() method
        expect(component).toBeTruthy() //toBeTruthy() to check if component was intanciated correctly 
        //expect(component).not.toBeTruthy() //it not should be instantiated the component
    })


    /* 
    public getTotalPrice(listCartBook: Book[]): number {
        let totalPrice = 0;
        listCartBook.forEach((book: Book) => {
          totalPrice += book.amount * book.price;
        });
        return totalPrice;  
    }
    */
    it('getTotalPrice returns an amount', () => {

        //using method that we want to to test
        const totalPrice = component.getTotalPrice(listBook)

        //it is not necessary to use many expects only the necessary
        expect(totalPrice).toBeGreaterThan(0) //take sure that number is positive
        //expect(totalPrice).not.toBe(0) //other way to test totalPrice greater than 0
        //expect(totalPrice).not.toBeNull()
    })

    /* 
    public onInputNumberChange(action: string, book: Book): void {
        const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
        book.amount = Number(amount);
        this.listCartBook = this._bookService.updateAmountBook(book); //I will check that it method is called correctly
        this.totalPrice = this.getTotalPrice(this.listCartBook);
    }
    */
    it('onInputNumberChange increments correctly', () => {
        const action = 'plus'
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        }

        // ============== the first incorrect way to call the service
        //casting the component, but we are breaking the advantages of typescript
        const service1 = (component as any)._bookService
        service1

        // ============== the second incorrect way to call the service
        //nut now we aren't breaking with typescript
        const service2 = component["_bookService"]
        service2

        const serviceForversionLessThan9 = TestBed.get(BookService) //no use this, because it is deprecated


        //creating spies to methods that not return 
        // it is important create firtst the spies and after to call method of component
        //to spy the method of service
                                         //the second param is the method that I will spy
        const spy1 = jest.spyOn(service,'updateAmountBook').mockImplementation( () => null  ) //the function passed to mockImplementation() will be executed when call the method of the service

        //to spy method of component
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation( () => null)

        expect(book.amount).toBe(2)
        component.onInputNumberChange(action, book)
        expect(book.amount).toBe(3)

        expect(spy1).toHaveBeenCalled() //if I don't know how many times will be called
        expect(spy2).toHaveBeenCalledTimes(1) //to check if it was called once
    })

    /* test to minus case */
    it('onInputNumberChange decrements correctly', () => {
        const action = 'minus'
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        }


        const service1 = (component as any)._bookService
        service1
        const service2 = component["_bookService"]
        service2

        const spy1 = jest.spyOn(service,'updateAmountBook').mockImplementation( () => null  )
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation( () => null)

        expect(book.amount).toBe(2)
        component.onInputNumberChange(action, book)
        expect(book.amount).toBe(1)
        expect(book.amount === 1).toBe(true) //another way to make the previous test

        expect(spy1).toHaveBeenCalled() //if I don't know how many times will be called
        expect(spy2).toHaveBeenCalledTimes(1) //to check if it was called once
    })



    /* 
        public onClearBooks(): void {
            if (this.listCartBook && this.listCartBook.length > 0) {
            this._clearListCartBook();
            } else {
            console.log("No books available");
            }
        }

        //the user never use private method directly, then we need to test public method that call to private method
        private _clearListCartBook() {
            this.listCartBook = [];
            this._bookService.removeBooksFromCart();
        }
    */
    it('onClearBooks works correctly', () => {
        
        //using spy for the service to block this method and mockImplementation to mock the service
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation( () => null) // to void call the original method

                            //component as any : to test private methdod because they aren't option
        const spy2 = jest.spyOn(component as any, '_clearListCartBook') 
        //const spy2 = jest.spyOn(component as any, '_clearListCartBook').mockImplementation( () => null) //if I use mockImplementation, never will be called the method removeBooksFromCart from service

        component.listCartBook = listBook
        component.onClearBooks()
        expect(component.listCartBook.length).toBe(0)
        expect(spy1).toHaveBeenCalledTimes(1)
        expect(spy2).toHaveBeenCalledTimes(1)

    })






    /* intil here I checked */
    //in case that we want to test _clearListCartBook private method, but it is not recommendable
    it('_clearListCartBook works correctly=', () => {
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation( () => null)
        component.listCartBook = listBook
        component["_clearListCartBook"]() //recommendable not use it
        expect(component.listCartBook.length).toBe(0)
        expect(spy1).toHaveBeenCalledTimes(1)
    })


    //xit : it is to anulate test
    xit('_clearListCartBook works correctly=', () => {
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation( () => null)
        component.listCartBook = listBook
        component["_clearListCartBook"]() //recommendable not use it
        expect(component.listCartBook.length).toBe(0)
        expect(spy1).toHaveBeenCalledTimes(1)
    })


    //fit : only this test will be executed, the rest will be canceled. It is very usefull to focus in an unique test
    fit('_clearListCartBook works correctly=', () => {
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation( () => null)
        component.listCartBook = listBook
        component["_clearListCartBook"]() //recommendable not use it
        expect(component.listCartBook.length).toBe(0)
        expect(spy1).toHaveBeenCalledTimes(1)
    })

    //it.only() works equally to fit
    it.only('_clearListCartBook works correctly=', () => {
        const spy1 = jest.spyOn(service, 'removeBooksFromCart').mockImplementation( () => null)
        component.listCartBook = listBook
        component["_clearListCartBook"]() //recommendable not use it
        expect(component.listCartBook.length).toBe(0)
        expect(spy1).toHaveBeenCalledTimes(1)
    })

})

//it is possible to make more describe() methods




