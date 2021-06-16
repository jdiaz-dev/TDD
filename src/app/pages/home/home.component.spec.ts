import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';
import { of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';


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

const bookServiceMock = { // ♥♥♥ I need to test it without spyes
    getBooks: () => of(listBook) // of : return an observable
}

//to test pipe
@Pipe({ name: 'reduceText' })
class ReducePipeMock implements PipeTransform {
    transform(): string {
        return ''
    }
}

describe('Home component', () => {
    let component: HomeComponent
    let fixture: ComponentFixture<HomeComponent>

    //beforeEach() it is called before every test
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                HomeComponent,

                //always that we are using pipe, add it to declarations
                ReducePipeMock //using pipe to test
            ],
            providers: [
                //BookService
                //to test a methods of service everytime that we call that service can be troublesome, then we can make the next
                {
                    provide: BookService,
                    useValue: bookServiceMock //this service will be used instead of original service( BookService )
                }


            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent)
        component = fixture.componentInstance
        fixture.detectChanges()

    })

    //beforeAll : only will be called at the beginnnig of everything
    beforeAll(() => {

    })

    //this function wll be executed after every test
    afterEach(() => {

    })

    //it will be executed after to finish all test
    afterAll(() => {

    })

    //our first test
    it('should create', () => {
        expect(component).toBeTruthy()
    })

    /* 
        public getBooks(): void {
            this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
            this.listBook = resp;
            });
        }
    */

    it('getBook get books from the subscription', () => {

        //obtaining service
        const bookService = fixture.debugElement.injector.get(BookService)

        //testing subscribe

        //it is not neccesary to use this service because we are using "bookServiceMock"
        //const spy1 = jest.spyOn(bookService, 'getBooks').mockReturnValueOnce( of(listBook) ) //of(listBook) : returning an observable and checking if return an array of type Book
        component.getBooks()

        //expect(spy1).toHaveBeenCalledTimes(1)
        expect(component.listBook.length).toBe(3)//with toBe() method we compare numbers, boolean
        expect(component.listBook).toEqual(listBook)//with toEqual() method we compare objects

    })




})