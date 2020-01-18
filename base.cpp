#include <iostream>
#include <fstream>
#include <vector>
#include <string>
using namespace std;

#define COMMAND_HELP 0
#define COMMAND_EXIT 1
#define COMMAND_RECORDEXPENSE 2
#define COMMAND_GENERATECLAIM 3
#define COMMAND_PRINTCATINFO 4
#define COMMAND_INVALID 7

#define MAXNO 50

class info {
public:
	float amt;
	char claimable;
	string desc;
};

vector<info> lunch, dinner, otherFood, transport, misc;

//TODO: currently, file is only reading and not appending. need to fix
fstream lunchfp ("lunch_dec19.txt", ios_base::in | ios_base::out | ios_base::app);
fstream dinnerfp ("dinner_dec19.txt", ios_base::app | ios_base::in);
fstream otherFoodfp ("otherFood_dec19.txt", ios_base::app | ios_base::in);
fstream transportfp ("transport_dec19.txt", ios_base::app | ios_base::in);
fstream miscfp ("misc_dec19.txt", ios_base::app | ios_base::in);

//interactive functions
void record_expense();
void calc_claim();
void pre_printInfo();
void printInfo(vector<info>, string);

//utility functions
void read_fdata();
int parse_command();
int check_command(string);
void print_help();

int main(){

	read_fdata();

	cout << "Welcome to the scrappy claims calculator!" << endl;
	cout << "Type \"help\" for more information..." << endl;
	parse_command();

	return 0;
}

void record_expense() {
	string str;

	while (1) {
		cout << "\nTypes of expenses:\n- lunch\n- dinner\n- other food\n- transport\n- misc\n" << endl;
		cout << "Enter type of expense: ";
		cin >> str;

		if (str[0] == 'l') {
			lunch.push_back(info());
			int n = lunch.size()-1;
			cout << "Enter lunch amount: ";
			cin >> lunch[n].amt;
			cout << "Is this lunch claimable? ";
			cin >> lunch[n].claimable;
			cout << "Enter description (optional): "; //but this is only reading in 1 word
			cin >> lunch[n].desc;
			lunchfp << lunch[n].amt << " " << lunch[n].claimable << " " << lunch[n].desc << endl;
			break;
		}

		else if (str[0] == 'd') {
			dinner.push_back(info());
			int n = dinner.size()-1;
			cout << "Enter dinner amount: ";
			cin >> dinner[n].amt;
			cout << "Is this dinner claimable? ";
			cin >> dinner[n].claimable;
			cout << "Enter description (optional): ";
			cin >> dinner[n].desc;
			dinnerfp << dinner[n].amt << " " << dinner[n].claimable << " " << dinner[n].desc << endl;
			break;
		}

		else if (str[0] == 'o') {
			otherFood.push_back(info());
			int n = otherFood.size()-1;
			cout << "Enter other food amount: ";
			cin >> otherFood[n].amt;
			cout << "Is this other food claimable? ";
			cin >> otherFood[n].claimable;
			cout << "Enter description (optional): ";
			cin >> otherFood[n].desc;
			otherFoodfp << otherFood[n].amt << " " << otherFood[n].claimable << " " << otherFood[n].desc << endl;
			break;
		}

		else if (str[0] == 't') {
			transport.push_back(info());
			int n = transport.size()-1;
			cout << "Enter transport amount: ";
			cin >> transport[n].amt;
			cout << "Is this transport claimable? ";
			cin >> transport[n].claimable;
			cout << "Enter description (optional): ";
			cin >> transport[n].desc;
			transportfp << transport[n].amt << " " << transport[n].claimable << " " << transport[n].desc << endl;
			break;
		}

		else if (str[0] == 'm') {
			misc.push_back(info());
			int n = misc.size()-1;
			cout << "Enter misc amount: ";
			cin >> misc[n].amt;
			cout << "Is this misc claimable? ";
			cin >> misc[n].claimable;
			cout << "Enter description (optional): ";
			cin >> misc[n].desc;
			miscfp << misc[n].amt << " " << misc[n].claimable << " " << misc[n].desc << endl;
			break;
		}
		else cout << "Invalid expense type!" << endl;

	}
	cout << "Success! Expense recorded." << endl;
}

//calculate total claim
void calc_claim() {
	int count = 0; float totalClaim = 0;

	for (int i = 0, n = lunch.size(); i < n; i++) if (lunch[i].claimable == 'y') count++;
	for (int i = 0, n = dinner.size(); i < n; i++) if (dinner[i].claimable == 'y') count++;
	for (int i = 0, n = otherFood.size(); i < n; i++) if (otherFood[i].claimable == 'y') count++;
	for (int i = 0, n = transport.size(); i < n; i++) if (transport[i].claimable == 'y') totalClaim += transport[i].amt;
	for (int i = 0, n = misc.size(); i < n; i++) if (misc[i].claimable == 'y') totalClaim += misc[i].amt;

	totalClaim += count*8;
	cout << "Total claim amount: " << totalClaim << endl;
}

//print info by category
void pre_printInfo() {
	int i; string str;

	while (1) {
		cout << "\nInfo categories:\n- lunch\n- dinner\n- other food\n- transport\n- misc\n" << endl;
		cout << "Which category would you like to print? " << endl;
		cin >> str;

		if (str[0] == 'l') {
			printInfo(lunch, "lunch");
			break;
		}
		else if (str[0] == 'd') {
			printInfo(dinner, "dinner");
			break;
		}
		else if (str[0] == 'o') {
			printInfo(otherFood, "otherFood");
			break;
		}
		else if (str[0] == 't') {
			printInfo(transport, "transport");
			break;
		}
		else if (str[0] == 'm') {
			printInfo(misc, "misc");
			break;
		}
		else cout << "Invalid category type!" << endl;
	}
}

void printInfo(vector<info> var, string str) {
	cout << "\nPrinting " << str << " info..." << endl;
	for (int i = 0, n = var.size(); i < n; i++) {
		cout << var[i].amt << " " << var[i].claimable << " " << var[i].desc << endl;
	}
	cout << endl;
}

void read_fdata() {

	for (int i = 0; i < MAXNO; i++) {
		lunch.push_back(info());
		lunchfp >> lunch[i].amt;
		if (lunch[i].amt == 0) {
			lunch.pop_back();
			break;
		}
		lunchfp >> lunch[i].claimable;
		lunchfp >> lunch[i].desc;
	}

	for (int i = 0; i < MAXNO; i++) {
		dinner.push_back(info());
		dinnerfp >> dinner[i].amt;
		if (dinner[i].amt == 0) {
			dinner.pop_back();
			break;
		}
		dinnerfp >> dinner[i].claimable;
		dinnerfp >> dinner[i].desc;
	}

	for (int i = 0; i < MAXNO; i++) {
		otherFood.push_back(info());
		otherFoodfp >> otherFood[i].amt;
		if (otherFood[i].amt == 0) {
			otherFood.pop_back();
			break;
		}
		otherFoodfp >> otherFood[i].claimable;
		otherFoodfp >> otherFood[i].desc;
	}

	for (int i = 0; i < MAXNO; i++) {
		transport.push_back(info());
		transportfp >> transport[i].amt;
		if (transport[i].amt == 0) {
			transport.pop_back();
			break;
		}
		transportfp >> transport[i].claimable;
		transportfp >> transport[i].desc;
	}

	for (int i = 0; i < MAXNO; i++) {
		misc.push_back(info());
		miscfp >> misc[i].amt;
		if (misc[i].amt == 0) {
			misc.pop_back();
			break;
		}
		miscfp >> misc[i].claimable;
		miscfp >> misc[i].desc;
	}
}

//parse_command works in a REPL style.
int parse_command() {
	string tmp_command;
	int command_code;

	while (1) {
		cout << "Waiting for command..." << endl;
		cin >> tmp_command;

		command_code = check_command(tmp_command);

		if (command_code == COMMAND_HELP) {
			print_help();
 		}
		else if (command_code == COMMAND_EXIT) {
			cout << "See you!" << endl;
			lunchfp.close();
			dinnerfp.close();
			otherFoodfp.close();
			transportfp.close();
			miscfp.close(); //might want to throw all these into a single close fn
			break;
		}
		else if (command_code == COMMAND_RECORDEXPENSE) {
			record_expense();
		}
		else if (command_code == COMMAND_GENERATECLAIM) {
			calc_claim();
		}
		else if (command_code == COMMAND_PRINTCATINFO) {
			pre_printInfo();
		}
		else {
			cout << "No such command: "<< tmp_command << ", please input command again!" << endl;
		}
	}
	return 0;
}

//This function takes a command as input and returns an integer as output.
/* INPUT        OUTPUT
   help           0
   exit           1
   recordExpense  2
   generateClaim  3
   printCatInfo   4
   */
int check_command(string input) {
	if (input == "help") {
		return COMMAND_HELP;
	}
	else if (input == "exit") {
		return COMMAND_EXIT;
	}
	else if (input[0] == 'r') {
		return COMMAND_RECORDEXPENSE;
	}
	else if (input[0] == 'g') {
		return COMMAND_GENERATECLAIM;
	}
	else if (input[0] == 'p') {
		return COMMAND_PRINTCATINFO;
	}
	else {
		return COMMAND_INVALID;
	}
}

void print_help() {
	cout << "Commands available: recordExpense, generateClaim, printCatInfo, help, exit" << endl;
}