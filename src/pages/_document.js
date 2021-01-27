import Document, { Html, Head, Main, NextScript } from 'next/document'

class CDocument extends Document{
    static async getInitialProps(ctx) {
        const initalProps = await Document.getInitialProps(ctx);
        console.log(initalProps, ctx);
        return initalProps
    }

    componentDidMount() {
        console.log(this.props);
    }

    render(){
        console.log(this.props);
        return (
            <Html>
                <Head>
                </Head>
                <body>
                    <Main>

                    </Main>
                    <NextScript>

                    </NextScript>
                </body>
            </Html>
        )
    }
}

export default CDocument
