import Serialize from 'php-serialize'
import {parseString} from 'xml2js';


const htmlspecialcharsDecode = (str) => {
    if (typeof(str) === "string") {
        str = str.replace(/&gt;/ig, ">");
        str = str.replace(/&lt;/ig, "<");
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/&quot;/ig, '"');
        str = str.replace(/&amp;/ig, '&');
        /* must do &amp; last */
    }
    return str;
};


export default (str) => {

    let data;
    let format;


    try {
        data = JSON.parse(str);
        format = 'json';
    } catch (e) {
        try {
            JSON.parse(htmlspecialcharsDecode(str));
            format = 'HTMLSpecialChars + json';
        } catch (e) {


            try {
                data = Serialize.unserialize(str);
                format = 'php serialized';
            } catch (e) {

                try {
                    data = Serialize.unserialize(htmlspecialcharsDecode(str));
                    format = 'HTMLSpecialChars + php serialized';
                } catch (e) {

                    try {
                        parseString(str, (_, result) => {
                            data = result;
                        });
                        format = 'xml';
                    } catch (e) {

                    }

                }

            }
        }


    }

    return [
        data,
        format,
    ];
}