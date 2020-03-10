export class Post {
    constructor(public post_pic:Object,
                public title: string,
                public story: string,
                public recipe: Array<String>,
                public ingredients:Array<String>,
                public by:string) {}
}