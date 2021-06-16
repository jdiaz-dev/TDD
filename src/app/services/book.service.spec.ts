import { BookService } from "./book.service"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from './../../environments/environment';
import swal from 'sweetalert2';

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

describe('BookService', () => {
    let service: BookService
    let httpMock: HttpTestingController//to void real request

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [


                HttpClientTestingModule
            ],
            providers: [
                BookService
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]

        })
    })

    afterEach(() => {
        localStorage.clear() //I am ensuring that local storage is empty
        jest.resetAllMocks() //to reset all things mocked (for this case the local storage)
    })

    beforeEach(() => {
        //service = TestBed.get(BookService) //deprecated since ANGULAR 9
        service = TestBed.inject(BookService)
        httpMock = TestBed.inject(HttpTestingController)

    })

    //the proffesor commonly is used in services that make request to API
    afterAll(() => {
        httpMock.verify() //to void pendant request between every test, to void the next request while exists a pendant request
    })

    it('should create', () => {
        expect(service).toBeTruthy()
    })

    /* 
        public getBooks(): Observable<Book[]> {
            const url: string = environment.API_REST_URL + `/book`;
            return this._httpClient.get<Book[]>(url);
        }
    */
    it('getBooks return a list of books and does a get method', () => {
        service.getBooks().subscribe((resp: Book[]) => {
            expect(resp).toEqual(listBook) //♥ first expect
        })

        const req = httpMock.expectOne(environment.API_REST_URL + `/book`) //request to url
        expect(req.request.method).toBe('GET') ///testing if request if type GET
        req.flush(listBook) //to check if it return listBook, to test ♥ first expect
    })



    /* 
        public getBooksFromCart(): Book[] {
            let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
            if (listBook === null) {
            listBook = [];
            }
            return listBook;
        }
    */
    it('getBooksFromCart return an empty array when local storage is empty', () => {
        const listBook = service.getBooksFromCart()
        expect(listBook.length).toBe(0)
    })

    it('getBooksFromCart return an empty array when it exists in local storage', () => {
        localStorage.setItem('listCartBook', JSON.stringify(listBook));
        const newListBook = service.getBooksFromCart()
        expect(newListBook.length).toBe(3)
    })


    /* 
    
        public addBookToCart(book: Book) {
            let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
            if (listBook === null) { // Create a list with the book
            book.amount = 1;
            listBook = [ book ];
            } else { 
            const index = listBook.findIndex((item: Book) => {
                return book.id === item.id;
            });
            if (index !== -1) { // Update the quantity in the existing book
                listBook[index].amount++;
            } else { 
                book.amount = 1;
                listBook.push(book);
            }
            }
            localStorage.setItem('listCartBook', JSON.stringify(listBook));
            this._toastSuccess(book);
        }
    */
    it('addBookToCart add a book successfully when the list does not exist in the localStorage', () => {
        const book: Book = {
            //adding this params because aren't optionals
            name: '',
            author: '',
            isbn: '',
            price: 15,
            //amount: 2 //removing amount because it is the first time that we add a book
        }

        //creating toastMock
        const toastMock = {
            fire: () => null
        } as any //as any : because the original toastMock is different to this method

        //spying to swal library
        const spy1 = jest.spyOn(swal, 'mixin').mockImplementation(() => {

            //to test if return a object with fire method, if we return a null in mockImplementation, the test will fail
            return toastMock
        })

        let newListBook = service.getBooksFromCart()
        expect(newListBook.length).toBe(0)
        service.addBookToCart(book)
        newListBook = service.getBooksFromCart()
        expect(newListBook.length).toBe(1)
        expect(spy1).toHaveBeenCalledTimes(1)

    })


    /* 
        public removeBooksFromCart(): void {
            localStorage.setItem('listCartBook', null);
        }
    */
    it('removeBooksFromCart remove the list from the localstorage', () => {
        const toastMock = {
            fire: () => null
        } as any

        jest.spyOn(swal, 'mixin').mockImplementation(() => {

            //to test if return a object with fire method, if we return a null in mockImplementation, the test will fail
            return toastMock
        })

        const book: Book = {
            //adding this params because aren't optionals
            name: '',
            author: '',
            isbn: '',
            price: 15,
            //amount: 2 //removing amount because it is the first time that we add a book
        }
        service.addBookToCart(book)
        let newListBook = service.getBooksFromCart()
        expect(newListBook.length).toBe(1)
        service.removeBooksFromCart()
        newListBook = service.getBooksFromCart()
        expect(newListBook.length).toBe(0)



    })

})