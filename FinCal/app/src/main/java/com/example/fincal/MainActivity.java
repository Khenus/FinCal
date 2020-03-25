package com.example.fincal;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.fincal.SQLHelper.DatabaseHelper;

import org.w3c.dom.Text;

import java.util.Calendar;

public class MainActivity extends AppCompatActivity {
    TextView viewDate;
    Button buttonAdd;
    EditText description, helloName, amountSpent;
    Cursor fetchedData;
    DatabaseHelper databaseHelper = new DatabaseHelper(this);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // region Setting name for the edit text
        SharedPreferences preferences = getSharedPreferences("namePref", MODE_PRIVATE);
        String name = preferences.getString("name", "");

        helloName = findViewById(R.id.greetingEdit);
        helloName.setText(name);
        helloName.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                SharedPreferences.Editor editor = getSharedPreferences("namePref", MODE_PRIVATE).edit();
                editor.putString("name", s.toString());
                editor.apply();
            }
        });
        // endregion Setting name for the edit text

        // region Setting date for the view
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);
        String monthStr = "";
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

        String allDate = day + " " + monthStr +  + year;
        viewDate = findViewById(R.id.text_view_date);
        viewDate.setText(allDate);

        // endregion Setting date for the view

        // region Setting amount left button
        TextView amountLeft = (TextView) findViewById(R.id.mainButtonMid);
        fetchedData = databaseHelper.fetchStatsData();
        fetchedData.moveToFirst();
        if(fetchedData.getCount() == 0){
            databaseHelper.addStatsEntry();
        } else {
            //amountLeft.setText(""+fetchedData.getString(2)); //This is the actual code
            amountLeft.setText("S$ 250.00");
        }

        amountLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, DetailedStats.class);
                startActivity(intent);
            }
        });

        // endregion Setting amount left button

        // region Setting options for the type spinner
        ArrayAdapter<String> typeAdapter = new ArrayAdapter<String>(MainActivity.this,android.R.layout.simple_list_item_1, getResources().getStringArray(R.array.Type));
        typeAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        final Spinner typeSpinner = findViewById(R.id.expense_type);
        typeSpinner.setAdapter(typeAdapter);
        // endregion Setting options for the type spinner

        // region Setting the button, amount spent and description boxes
        amountSpent = findViewById(R.id.amount);
        buttonAdd = findViewById(R.id.button2);
        description = findViewById(R.id.item_desc);

        buttonAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String type = typeSpinner.getSelectedItem().toString();
                String desc = description.getText().toString();
                String amt = amountSpent.getText().toString();

                if(desc.length() == 0){
                    Toast.makeText(MainActivity.this, "Description cannot be empty", Toast.LENGTH_SHORT).show();
                } else if(amt.length() == 0){
                    Toast.makeText(MainActivity.this, "Amount cannot be empty", Toast.LENGTH_SHORT).show();
                } else if(desc.length() != 0 && amt.length() != 0){
                    boolean insertDataPass = databaseHelper.addDataToMain(type, desc, amt);

                    if(insertDataPass){
                        Toast.makeText(MainActivity.this, "Data successfully inserted", Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(MainActivity.this, "Data insertion failed", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });

        // endregion Setting the button, amount spent and description boxes

    }
}
