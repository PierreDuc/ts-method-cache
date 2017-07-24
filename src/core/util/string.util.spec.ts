import {createGUID} from "./string.util";

describe('String Util', () => {

    describe('GUID generator, createGuide', () => {

        let guid: string = createGUID();

        it("generates a string of 36 characters", () => {
            expect(guid.length).toBe(36);
        });

        it("generates a string which has a dash at position [8], [13], [18] and [23]", () => {
            expect(guid[8]).toBe('-');
            expect(guid[13]).toBe('-');
            expect(guid[18]).toBe('-');
            expect(guid[23]).toBe('-');
        });

        it("generates a string that has the character '4' at position [14]", () => {
            expect(guid[14]).toBe('4');
        });

        it("generates a string that only consists of lowercase hexadecimal characters, without the dashes", () => {
            expect(/^[0-9a-f]{32}$/.test(guid.replace(/-/g, ''))).toBeTruthy();
        });

        it("it generates two different strings", () => {
            expect(guid !== createGUID()).toBeTruthy()
        });
    });

});