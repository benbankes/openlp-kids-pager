let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../custom.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

function getKidIdCharacters() {
    let chars = [];

    for (let i = 0; i < 10; i++) {
        chars.push(i);
    }

    for (let i = 65; i <= 65 + 25; i++) {
        chars.push(String.fromCharCode(i));
    }

    return chars.join('');
}

let permutate = (() => {
    let results = [];
    function doPermute(input, output, used, size, level) {
        if (size == level) {
            let word = output.join('');
            results.push(word);
            return;
        }

        level++;

        for (let i = 0; i < input.length; i++) {
            if (used[i]) {
                continue;
            }
            used[i] = true;
            output.push(input[i]);
            doPermute(input, output, used, size, level);
            used[i] = false;
            output.pop();
        }
    }

    return {
        getPermutations: function(input, size) {
            let chars = input.split('');
            let output = [];
            let used = new Array(chars.length);
            doPermute(chars, output, used, size, 0);
            return results;
        }
    }
})();

function getCustomSlideText(readableText) {
    return `<?xml version='1.0' encoding='utf-8'?><song version='1.0'><lyrics language='en'><verse label='1' type='custom'><![CDATA[${readableText}]]></verse></lyrics></song>`
}

async function generateSlides() {
    let kidIdLength = 4;
    let count = 0;

    let queries = [];
    let startingSql = 'INSERT INTO `custom_slide` (`title`, `text`, `credits`, `theme_name`) VALUES ';

    try {
        let permutations = permutate.getPermutations(getKidIdCharacters(), kidIdLength);
        let numberOfPermutations = permutations.length;
        let sql = startingSql;

        permutations.forEach((permutation) => {
            count++;

            sql += '("' + permutation + '", "' + getCustomSlideText(permutation) + '", "", "Default")';

            if (count % 100000 === 0 || count === numberOfPermutations) {
                sql += ';';

                queries.push(sql);

                sql = startingSql;
            } else {
                sql += ', ';
            }
        });

        console.log('Done creating queries');
        db.run('DELETE FROM `custom_slide`;', [], function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);
        });
        console.log('Done truncating table');

        queries.forEach((query) => {
            db.run(query, [], function(err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Rows inserted ${this.changes}`);
            });
        });

        console.log('Done with database');
    } catch (e) {
        console.log('error');
        console.log(e);
    }
}

generateSlides();
