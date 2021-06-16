
import { ReduceTextPipe } from './reduce-text.pipe';
//test for pipes are more easy than another, because it not need of TestBed

describe('ReduceTextPipe', () => {

    let pipe:ReduceTextPipe

    beforeEach( () => {
        pipe = new ReduceTextPipe()
    })

    it('should create', () => {
        expect(pipe).toBeTruthy() //to test if it pipe was created
    })

    /* 
    transform(value: string, ...args: number[]): string {
        return value.substring(0, args[0]);
    }
    */

    it('use pipe correctly' ,() => {
        const text = 'Hello this is a text to check the pipe'
        const newText = pipe.transform(text, 5)
        expect(newText.length).toBe(5)

    })
})


