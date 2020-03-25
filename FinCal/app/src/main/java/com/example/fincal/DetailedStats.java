package com.example.fincal;

import android.database.Cursor;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.fincal.SQLHelper.DatabaseHelper;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import static java.lang.Float.parseFloat;
import static java.lang.Integer.parseInt;

public class DetailedStats extends AppCompatActivity {
    TextView amtSpent, amtLeft, allowance;
    Cursor data;
    DatabaseHelper databaseHelper = new DatabaseHelper(this);
    ArrayList<Stats> allStatsEntries;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pie_chart);

        allowance = findViewById(R.id.moneyAllowEdit);
        amtSpent = findViewById(R.id.moneyUsedView);
        amtLeft = findViewById(R.id.moneyLeftView);

        // region Getting data from sqlite and inserting it into a list
        data = databaseHelper.getAllStatsEntry();
        allStatsEntries = new ArrayList<>();
        while(data.moveToNext()){
            String allowanceData = data.getString(1);
            String amtSpentData = data.getString(2);
            String amtLeftData = data.getString(3);
            String dateData = data.getString(4);
            allStatsEntries.add(new Stats(allowanceData, amtSpentData, amtLeftData, dateData));
        }
        // endregion Getting data from sqlite and inserting it into a list

        // region Getting data for current month's stats from sqlite
        data = databaseHelper.fetchStatsData();
        data.moveToFirst();
        final String allowData = data.getString(1);
        final String amtSpentData = data.getString(2);
        String amtLeftData = data.getString(3);
        final String dateData = data.getString(4);
        // endregion Getting data for current month's stats from sqlite

        /*allowance.setText(allowData);
        amtSpent.setText(amtSpentData);
        amtLeft.setText(amtLeftData);*/

        Spinner spinner = findViewById(R.id.monthsSpinner);
        List<String> spinnerList = new ArrayList<>();

        for(int i = 0; i < allStatsEntries.size(); i++){
            String monthStr = "";
            String year = allStatsEntries.get(i).getCreatedAt().substring(0, 4);
            int month = parseInt(allStatsEntries.get(i).getCreatedAt().substring(5));
            switch (month){
                case 1: monthStr = "January "; break;
                case 2: monthStr = "February "; break;
                case 3: monthStr = "March "; break;
                case 4: monthStr = "April "; break;
                case 5: monthStr = "May "; break;
                case 6: monthStr = "June "; break;
                case 7: monthStr = "July "; break;
                case 8: monthStr = "August "; break;
                case 9: monthStr = "September "; break;
                case 10: monthStr = "October "; break;
                case 11: monthStr = "November "; break;
                case 12: monthStr = "December "; break;
            }

            spinnerList.add(monthStr + year);
        }

        ArrayAdapter<String> spinnerAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, spinnerList);
        spinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(spinnerAdapter);
        spinnerAdapter.notifyDataSetChanged();

        /*allowance.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence input, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                float inputFloat = parseFloat(s.toString());

                float amountSpent = parseFloat(amtSpentData);
                float amountLeft = inputFloat - amountSpent;

                DecimalFormat df = new DecimalFormat();
                df.setMaximumFractionDigits(2);

                allowance.setText("" + df.format(amountLeft));

                for(int i = 0; i < allStatsEntries.size(); i++){
                    if(allStatsEntries.get(i).getCreatedAt().contains(dateData)){
                        allStatsEntries.get(i).setAllowance(s.toString());
                        allStatsEntries.get(i).setUsed(amtSpentData);
                        allStatsEntries.get(i).setLeft("" + amountLeft);
                        break;
                    }
                }

                if(databaseHelper.updateStatsData("" + inputFloat, "" + amountSpent, "" + amountLeft)){
                    Log.i("Update status: ", "Succcessful");
                } else {
                    Log.i("Update status: ", "Failed");
                }
            }
        });*/
    }
}
