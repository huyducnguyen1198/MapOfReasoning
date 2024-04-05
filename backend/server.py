from flask import Flask, request
import searchengine

app = Flask(__name__)

@app.route('/searchBySentence', methods=['GET'])
def searchBySentence():
	sentence = request.args.get('sentence')
	num_results = request.args.get('num_results')
	print(sentence)
	if sentence:
		if num_results:
			data = searchengine.searchBySentence(sentence, int(num_results)).to_json()
			return data
		else:
			return searchengine.searchBySentence(sentence).to_json()
	return ""


@app.route('/searchByParagraph', methods=['GET'])
def searchByParagraph():
	sentence = request.args.get('sentence')
	num_results = request.args.get('num_results')
	print(sentence)
	if sentence:
		if num_results:
			data = searchengine.searchByParagraph(sentence, int(num_results)).to_json()
			return data
		else:
			return searchengine.searchByParagraph(sentence).to_json()
	return ""

@app.route('/searchBySection', methods=['GET'])

def searchBySection():
	sentence = request.args.get('sentence')
	num_results = request.args.get('num_results')
	print(sentence)
	if sentence:
		if num_results:
			data = searchengine.searchByTitleSec(sentence, int(num_results)).to_json()
			return data
		else:
			return searchengine.searchByTitleSec(sentence).to_json()
	return ""


if __name__ == '__main__':
    app.run(debug=True)